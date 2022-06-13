import http from 'http';
import * as fs from 'fs';
import * as bare from './static/customBare.js';
import path from 'path';

const __dirname = process.cwd();

const port = 8080;

const requestListener = function(req, res) {
  if (bare.isBare(req, res)) {
    bare.route(req,res);
  } else {
    if (req.url === "/") {
      var index = fs.readFileSync(__dirname+"/static/index.html", 'ascii');
      res.end(index)
    } else if (req.url === "/cyclone.svg") {
      var image = fs.readFileSync(__dirname+"/static/cyclone.png");
      res.writeHead(200,'Sucess', {
        'content-type':'image/png'
      })
      res.end(image)
    } else {
      res.writeHead(404)
      res.end("404 Not Found")
    }
  }
}

const server = http.createServer(requestListener);
server.listen(port);