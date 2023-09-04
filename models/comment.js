const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comments belong to user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;