var mongoose = require('mongoose'),
    https = require('https'),
  Article = mongoose.model('Article');


module.exports.index = function(req, res){

    return res.render('home/index');
};

module.exports.postLogin = function(req, res) {
    return res.render('home/postLogin');
}