var concat = require('concat-stream');

process.stdin.pipe(concat(function(body) {
  var s = body.toString().split('').reverse().join('');
  console.log(s);
}));