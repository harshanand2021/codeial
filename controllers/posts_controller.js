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