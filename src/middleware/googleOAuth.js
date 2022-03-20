const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const controller = require('../authentication/auth.controller');

require('dotenv').config();

const strategy = new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/google/callback",
    passReqToCallback   : true
    },
    (request, accessToken, refreshToken, profile, done) => { 
        //TODO : check if there is a user with that email otherwise add a new one
        done(null, profile);
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
    googleAuthenticate: passport.authenticate('google', { scope: ['email', 'profile'] }),
    googleCallback: passport.authenticate('google', { 
        successRedirect: '/success',
        failureRedirect: '/fail'
    })
}