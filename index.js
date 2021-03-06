const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const articles=require("./article");
const comments=require("./comments");
const extras=require("./extras");
const static = require('./static');

const handlers = {
  '/api/articles/readall': articles.readall,
  '/api/articles/read': articles.read ,
  '/api/articles/create': articles.create,
  '/api/articles/update': articles.update,
  '/api/articles/delete': articles.delete,
  '/api/comments/create': comments.create,
  '/api/comments/delete': comments.delete,
    '/api/logs'          : extras.send,
    '/' :           static.defaulthtml,
    '/index.html' : static.defaulthtml,
    '/form.html' :  static.formhtml,
    '/app.js' :     static.indexjs,
    '/form.js' :    static.formjs,
    '/site.css' :   static.sitecss
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);
    handler(req, res, payload, (err, result) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end( JSON.stringify(err) );
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end( JSON.stringify(result) );
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
  cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
  let body = [];

  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    extras.logRequest(req.url, body,new Date().toISOString());
    console.log("body : " + body);
    if(body !== "")
    {
        params = JSON.parse(body);
        cb(null,params);
    }
    else {
        cb(null, null);
    }
  });
}