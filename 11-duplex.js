var spawn = require('child_process').spawn;
var duplex = require('duplexer2');

module.exports = function(cmd, args) {
  var ps = spawn(cmd, args);
  return duplex(ps.stdin, ps.stdout);
}