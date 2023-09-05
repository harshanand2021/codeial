const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comment.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    });
}

module.exports.destroy = function(req, res){
    comment.findById(req.params.id, function(req, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}