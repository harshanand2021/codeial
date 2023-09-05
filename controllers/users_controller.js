const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, u){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

// render the sign Up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });ser
}

// render the sign In page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if(user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding the user in Signing In'); return}

        // handle user found
        if(user){
            // handle password which don't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id' == user.id);
            return res.redirect('users/profile');
        }
        else{
            // handle user not found
            res.redirect('back');
        }
    });
    // TODO later
}

// sign-in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();


    return res.redirect('/');
}