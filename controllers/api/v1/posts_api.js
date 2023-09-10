const Post = require("../../../models/post");
const comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "list of posts",
    posts: [],
  });
};


const Post = require('../models/post');
const comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post Created!"
            })
        }

        req.flash('success', 'Post published');
        return res.redirect('back');
    }catch(err){
        req.flash('success', 'Post published');
    }
    await Post.create({
        content: req.body.content,
        user: req.user._id,
    });
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted successfully"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            })
        }

        req.flash('success', 'Post Deleted');
        return res.redirect('back');
    }catch(err){
        req.flash('Cannot delete post', err);
    }
    await Post.create({
        content: req.body.content,
        user: req.user._id,
    });
}