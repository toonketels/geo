var server = require("./server");
var router = require( "./router" );
var requestHandlers = require( "./requestHandlers" );

// List of urls we want to handle/map
// We pass the entire list to the server,
// which will pass it to the rooter
// => all action happens in the server
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;


server.start( router.route, handle );

