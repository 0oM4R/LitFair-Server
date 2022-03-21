const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../authentication/auth.DB').User;
const bcrypt = require('bcrypt');
const salt = 8;

require('dotenv').config();

const strategy = new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/google/callback",
    passReqToCallback   : true
    },
    (request, accessToken, refreshToken, profile, done) => { 
        User.findOne({
            where: { email: profile.email }
        }).then(async (user) => {
            if(!user){
                const password = profile.email + profile.id;
                bcrypt.hash(password, salt, async (err, hash) => {
                    await User.create({
                        email:         profile.email,
                        password:      hash,
                        external_type: profile.provider,
                        external_id:   profile.id
                    });
                });
            }
        });
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
    googleCallback: passport.authenticate('google')
}