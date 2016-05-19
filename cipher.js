var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var cipher = Promise.promisify(bcrypt.hash);

  console.time("hash2");
  var pw = '1234567890';
  cipher(pw, null, null).bind(this)
    .then(function(hash) {
      console.timeEnd("hash2");
      //console.log('storing pw as ', hash);
      console.time("hash3");
      console.log(hash);
      console.timeEnd("hash3");
//      next();
    });
