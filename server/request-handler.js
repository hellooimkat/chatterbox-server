/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var obj = {
  results: [
  ]
};

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'json';
  var statusCode;
  // console.log('-----------', statusCode, request.method);
  // response.writeHead(statusCode, headers);

  if (request.method === 'GET') {
    if (request.url === '/classes/messages') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(obj));
    } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);
    }
  } else if (request.method === 'POST'){
    if (request.url === '/classes/messages') {
      let body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        obj.results.push(JSON.parse(body));
      });
      statusCode = 201;
      response.writeHead(statusCode, headers);
      console.log(statusCode, request.method);
      response.end(JSON.stringify(obj));
    }
  } else if (request.method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  } else {
    statusCode = 400;
    response.writeHead(statusCode, headers);
    response.end();
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;