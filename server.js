// Updated server to be able to handle post data.
// In node: postdata is transfered in small pieces of post data,
// every time a packet arrives, the "data" event is emitted.
// When all data has arrived, the "end" event is emitted.

// We create the server so it takes all the post data and passes
// the entire data to the eventHandlers via the router.

var http = require("http");
var url = require("url");

function start( route, handle ) {
  function onRequest(request, response) {
    
    // Variable to hold the data of the POST request,
    // will be filled everytime we get the "data" event gets fired.
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    
    // Define the encoding, we expect it to be in utf8
    request.setEncoding( "utf8" );
    
    // Added event listener to request object. It will execute
    // the anonymous function everytime the "data" event occures.
    // It will add the postdata to the postdata var.
    // The "data" event is emited every time a piece of the post data
    // is received.
    request.addListener( "data", function( postDataChunk ) {
      postData += postDataChunk;
      console.log( "Received POST data chuck'" + postDataChunk +"'." );
    });
    
    // Request also listens to the "end" event.
    // This event is emitted when all Post data has been received received.
    // When all data is received, the router will be called and the postdata
    // passed to it (so it can pass it to the requesthandler);
    request.addListener( "end", function() {
      console.log( "All post data recieved, passing it to the router" );
      route( handle, pathname, response, postData );
    });
  }
  
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

