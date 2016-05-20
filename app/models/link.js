var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  visits: Number,
  title: String,
  createdAt: { type: Date, default: Date.now }
});

linkSchema.methods.fetch = function (cb) {
  //console.log('fetching');
  return this.model('Link').findOne({ url: this.url }, cb);
  // return this.model('Animal').find({ type: this.type }, cb);
};

linkSchema.pre('save', function(next) {
  //console.log('got to presave on link');
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  //console.log('this.code', this.code);
  next();
});



var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
