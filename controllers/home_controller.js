const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    Post.find({}, function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

    User.find({}, function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

    Post.find({}).populate('user').exec()
}