const passport = require("passport");
const googleStrategy = require("passport-google-auth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy({
    clientID:
      "553139816730-bbu4fc3h90rv2cbchogckho72417pvne.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://localhost:8000/users/auth/google",
  },
  function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){console.log("Error in google strategy-passport", err); return;}

        console.log(profile);

        if(user){
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){console.log("Error in creating the user google-strategy-passport",err);return;}

                return done(null, user);
            });
        }
    });
  }
))

module.exports = passport;