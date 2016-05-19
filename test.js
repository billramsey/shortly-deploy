var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  visits: Number,
  title: String,
  createdAt: { type: Date, default: Date.now }
});

linkSchema.methods.fetch = function (cb) {
  console.log('fetching');
  return this.model('Link').findOne({ url: this.url }, cb);
  // return this.model('Animal').find({ type: this.type }, cb);
};
var Link = mongoose.model('Link', linkSchema);

var uri = 'hi';
var title = 'title';
var base = 'base';
console.log('here');

        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: base 
        });
        newLink.save().then(function(newLink) {
console.log('got to save');
//          Links.add(newLink);
console.log('links');
 //         res.status(200).send(newLink);
        }).catch(function(err) {
console.log('err', err);
});
Link.find({}, function(err, docs) {

console.log(docs);
});
