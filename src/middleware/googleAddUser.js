const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../authentication/auth.DB').User;

require('dotenv').config();

const strategy = new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID_ADD_USER,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_ADD_USER,
  callbackURL: "http://127.0.0.1:3000/google/callback/adduser",
  passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => { 
    const user = User.findOne({
      where: { email: profile.email }
    }).then(async (user) => {
      if (!user){
        done(null,profile)
      }
      else{
        done(new Error("The user already exists"),null);
      }
    })
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) =>{
  done(null, user);
});

module.exports = { 
  googleAuthenticateAddUser: passport.authenticate('google', { scope: ['email', 'profile'] }),
  googleCallbackAddUser: passport.authenticate('google')
}