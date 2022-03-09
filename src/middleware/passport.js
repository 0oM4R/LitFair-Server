const fs = require('fs');
const path = require('path');
const User = require('../authentication/auth.DB').User;

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// get public key path
const pubKeyPath = path.join(__dirname, '..', 'id_rsa_pub.pem');
const Pub_key = fs.readFileSync(pubKeyPath, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Pub_key,
  algorithm: ['RS256'],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ where: { id: payload.sub } })
    .then((user) => {
      if (user) {
        console.log('authonticated');
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

passport.use(strategy);

passport.initialize();

module.exports = { passport: passport.authenticate('jwt', { session: false }) };
