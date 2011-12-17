// Accept the postData as an argument to make it available
// to our request handler.

function start( response, postData ) {
  console.log( "Request handler 'start' was called." );
  
  // Create html form
  var body= '<html>';
  body += '<head>';
  body += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
  body += '</head>';
  body += '<body>';
  body += '<form action="/upload" method="post">';
  body += '<textarea name="text" rows"20" cols="60"></textarea>';
  body += '<input type="submit" value="Submit text" />';
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

exports.start = start;
exports.upload = upload;
