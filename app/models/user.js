var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.fetch = function (cb) {
  //User.findOne({name: "Guns N' Roses"});
  //console.log('fetching');
  return this.model('User').findOne({ username: this.username }, cb);

  // return this.model('Animal').find({ type: this.type }, cb);
};

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  // var cipher = Promise.promisify(bcrypt.hash);
  // return cipher(this.password, null, null).bind(this)
  //   .then(function(hash) {
  //     this.password = hash; //?????
  //   });
};

userSchema.pre('save', function(next) {
  // do stuff
  // console.log("GOT TO INIT");
  // console.log('pw', this.password);
  console.time("hash1");

  var cipher = Promise.promisify(bcrypt.hash);

  console.timeEnd("hash1");
  console.time("hash2");
  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      console.timeEnd("hash2");
      //console.log('storing pw as ', hash);
      console.time("hash3");
      this.password = hash;
      console.timeEnd("hash3");
      next();
    });
  
});

var User = mongoose.model('User', userSchema);

module.exports = User;
