const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User=require("../modals/user")
require("dotenv").config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID =process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET =process.env.GITHUB_CLIENT_SECRET
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const user=new User({
        id:"google-"+profile.id,
        username:profile.displayName,
        pic:profile.photos[0].value,
        email:profile.emails[0].value,
        followers:[],
        following:[]
      })
      User.exists({id:"google-"+profile.id}, function (err, res) {
        if (err){
            console.log(err)
        }else{
            if(!res)
            {
                user.save((err, doc) => {
                  if (!err)
                      console.log("successful");
                  else
                      console.log('Error during record insertion : ' + err);
                  });
            }
        }
      })
         done(null, user);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const user=new User({
        id:'github-'+profile.id,
        username:profile.displayName,
        pic:profile.photos[0].value,
        email:profile._json.email,
        followers:[],
        following:[]
      })
      User.exists({id:'github-'+profile.id}, function (err, res) {
        if (err){
            console.log(err)
        }else{
            if(!res)
            {
                user.save((err, doc) => {
                  if (!err)
                      console.log("successful");
                  else
                      console.log('Error during record insertion : ' + err);
                  });
            }
        }
      })
         done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    
    function (accessToken, refreshToken, profile, done) {
    const user=new User({
      id:'facebook-'+profile.id,
      username:profile.displayName,
      pic:profile.photos[0].value,
      email:profile._json.email,
      followers:[],
      following:[]
    })
    User.exists({id:'facebook-'+profile.id}, function (err, res) {
      if (err){
          console.log(err)
      }else{
          if(!res)
          {
              user.save((err, doc) => {
                if (!err)
                    console.log("successful");
                else
                    console.log('Error during record insertion : ' + err);
                });
          }
      }
    })
       done(null, user);
  }
)
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
