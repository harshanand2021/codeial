const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    // populate the user of each post
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
  } catch (err) {
    console.log("Error", err);
    return;
  }
  // console.log(req.cookies);
  // res.cookie('user_id', 25);
};
