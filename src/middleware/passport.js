const fs = require('fs');
const path = require('path');
const User_model = require('../services/User/model-User').User_model;

const passport = require('passport');
const console = require('console');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

require('dotenv').config();


// get public key path
const pubKeyPath = path.join(__dirname, '..', 'id_rsa_pub.pem');
const Pub_key = fs.readFileSync(pubKeyPath, 'utf8');

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
    token = req.cookies['auth'];
  }
  return token;
};

const options = {
  //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //uncomment the following line if the token is in cookies
  jwtFromRequest: cookieExtractor,
  secretOrKey: Pub_key,
  algorithm: ['RS256'],
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  User_model.findOne({ where: { id: payload.id } })
    .then((user) => {
      if (user) {
        return done(null,{id:user.id, rules: user.role,email:user.email});
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

const googleAddUserStrategy = new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID_ADD_USER,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_ADD_USER,
  callbackURL: "http://127.0.0.1:3000/google/callback/adduser",
  passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => { 
    const user = User_model.findOne({
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

const googleOAuthStrategy = new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/google/callback",
  passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => { 
    const user = User_model.findOne({
      where: { email: profile.email }
    }).then(async (user) => {
      if (!user){
        done(new Error("Couldn't find please sign up first"),null);
      }
      else{

        done(null,user);
      }
    })
  }
);


passport.use('jwt', jwtStrategy);
passport.use('googleOAuth', googleOAuthStrategy);
passport.use('googleAddUser', googleAddUserStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) =>{
  done(null, user);
});

passport.initialize();

module.exports = {
  jwtStrategy: passport.authenticate('jwt', { session: false }),
  googleAuthenticate: passport.authenticate('googleOAuth', { scope: ['email', 'profile'] }),
  googleCallback: passport.authenticate('googleOAuth'),
  googleAuthenticateAddUser: passport.authenticate('googleAddUser', { scope: ['email', 'profile'] }),
  googleCallbackAddUser: passport.authenticate('googleAddUser'),
};
