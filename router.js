// Add the postData as an argument and pass it through to the requestHandler

function route( handle, pathname, response, postData) {
  console.log( "About to route a request for " + pathname );
  
  if(typeof handle[pathname] === 'function') {
    // Pass postData to requestHandler
    return handle[pathname](response, postData);
  } else {
    console.log( "No request handler found for " + pathname );
    
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found");
    response.end();
  }

}

exports.route = route;
