const fs = require('fs');
const path = require('path');
const User = require('../authentication/auth.DB').User;

const passport = require('passport');
const console = require('console');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ where: { email: payload.sub } })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

passport.use(strategy)

passport.initialize();

module.exports = { passport: passport.authenticate('jwt', { session: false }) };