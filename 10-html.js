var trumpet = require('trumpet');
var through = require('through2');

var transform = through((buf, enc, next)=>{ 
  next(null, buf.toString().toUpperCase());
});

var tr = trumpet();
var selector = tr.select('.loud').createStream();

process.stdin
  .pipe(selector)
  .pipe(transform)
  .pipe(process.stdout);