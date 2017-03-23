var tar = require('tar');
var concat = require('concat-stream');
var crypto = require('crypto');
var zlib = require('zlib');

var name = process.argv[2];
var passphrase = process.argv[3];

var parser = tar.Parse();

parser.on('entry', (e)=> {
  if (e.type !== 'File') return;

  var h = crypto.createHash('md5', { encoding: 'hex' });

  e.pipe(h).pipe(concat(function(hash) {
    console.log(hash + ' ' + e.path);
  }));
});

process.stdin.pipe(crypto.createDecipher(name, passphrase))
  .pipe(zlib.createGunzip())
  .pipe(parser);

  // .pipe(tar.Parse())
  // .pipe(crypto.createHash('md5', {encoding: 'hex' }))
  // .pipe(process.stdout);