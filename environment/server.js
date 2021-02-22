var http = require('http');
var fs = require('fs');
var url = require('url');

var express = require('express');
var app = express();
app.use(express.static('public'));

http.createServer( function (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("Trying to find '" + pathname.substr(1) + "'...");

  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write("ERROR: Cannot find '" + pathname.substr(1) + "'.");
      console.log("ERROR: Cannot find '" + pathname.substr(1) + "'.");
    } else {
      var dotoffset = request.url.lastIndexOf('.');
      var mimetype = dotoffset == -1
                      ? 'text/plain'
                      : {
                          '.html' : 'text/html',
                          '.ico' : 'image/x-icon',
                          '.jpg' : 'image/jpeg',
                          '.png' : 'image/png',
                          '.gif' : 'image/gif',
                          '.css' : 'text/css',
                          '.js' : 'text/javascript',
                          '.json' : 'text/json',
                        }[ request.url.substr(dotoffset) ];
      response.setHeader('Content-type' , mimetype);
      response.end(data);
      console.log("Found '" + pathname.substr(1) + "'.");
    }
    response.end();
  });
}).listen(8080, '0.0.0.0'); // Or 8081 or 8082 instead of 8080. Or '127.0.0.1' instead of 'localhost'.