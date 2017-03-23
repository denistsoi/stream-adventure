var combine = require('stream-combiner');
var split = require('split');
var through = require('through2');
var zlib = require('zlib');

module.exports = function () {
    var group = through(write, end);    
    var current;

    function write(buf, _, next) {
      if (buf.length === 0) return next();
      var row = JSON.parse(buf);

      if (row.type === 'genre') {
        if (current) {
          this.push(JSON.stringify(current) + '\n');
        };
        current = { name: row.name, books: [] };
      } else if (row.type === 'book') {
        current.books.push(row.name);
      }
      next();
    };

    function end(next) {
      if (current) {
        this.push(JSON.stringify(current) + '\n');
      }
      next();
    }


    return combine(
      split(),
      group,
      zlib.createGzip()
    );
};


// var duplex = require('duplexer2');
// var through = require('through2').obj;

// module.exports = function(counter) {
//   var counts = {};
//   var input = through(write, end);
//   return duplex({ objectMode: true }, input, counter);

//   function write(row, _, next) {
//     counts[row.country] = (counts[row.country] || 0)  + 1;
//     next();
//   };

//   function end(done) {
//     counter.setCounts(counts);
//     done();
//   }
// };