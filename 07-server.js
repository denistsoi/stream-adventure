var http = require('http');
var through = require('through2');

var server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(through(function (buf, enc, next) {
      next(null, buf.toString().toUpperCase());
    })).pipe(res);
  }
  else res.end()
});

server.listen(parseInt(process.argv[2]));

// using fat arrow and this.push messes things up;