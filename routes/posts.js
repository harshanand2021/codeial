const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create', passport, postsController.create);
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;