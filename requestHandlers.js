// Accept the postData as an argument to make it available
// to our request handler.

var geocoder = require( './geocoder' );
var querystring = require( 'querystring' );

function start( response, postData ) {
  console.log( "Request handler 'start' was called." );
  
  // Create html form
  var body= '<html>';
  body += '<head>';
  body += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
  body += '</head>';
  body += '<body>';
  body += '<form action="/coordinates" method="post">';
  body += '<textarea name="text" rows"20" cols="60"></textarea>';
  body += '<input type="submit" value="Get coordinates" />';
  body += '</form>'
  body += '</body>';
  body += '</html>';
  
  // Send response
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();

}

function upload( response, postData ) {
  console.log( "Request handler 'upload' was called." );
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  // Display the posted data on the page.
  // In real life, only display the stuff that we need,
  // not the entire body of the post request.
  response.write( "You've send: " + postData );
  response.end();  
}


function coordinates( response, postData ) {
  // Get the address
  var address = querystring.parse( postData ).text;
  console.log( "Request handler 'birthplace' was called with following address: " + address );

  // Get the coordinates
  geocoder.getCoordinates( address, function( error, address, coordinates ){
    // Check if we have some errors
    if( error ) {
      console.log( error.message );
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end( 'Sorry, we couldn’t retrieve the coordinates, try again later.' );
      return;
    }
    // Act when we don't have a result
    if ( !coordinates ) {
      response.writeHead( 200, {'Content-Type': 'text/plain'} );
      response.end( 'Sorry, we did not find the coordinates for this address.' );
      return;
    }
    // Finally, act when we do have the result
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end( 'The coordinates are ' + coordinates.lng + ' ' + coordinates.lat );
  });
  
}

exports.start = start;
exports.upload = upload;
exports.coordinates = coordinates;
