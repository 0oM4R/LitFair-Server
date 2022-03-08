const fs = require('fs');
const path = require('path');
const User= require('../authentication/auth.DB');
const JwtStrategy= require('passport-jwt').Strategy;
const ExtractJwt= require('passport-extract-jwt').ExtractJwt;

// get public key path 
 const pubKeyPath= path.join(__dirname, '..','id_rsa_pub.pem');
const Pub_key= fs.readFileSync(pubKeyPath, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Pub_key,
    algorithm: ['RS256']
};

const strategy = new JwtStrategy(options,(payload,done) => {
    User.findOne({where: {id: payload.id}})
    .then((user) => {
        if(user){
            return done(null,user);
        }else {
            return done(null, false);
        }
    }).catch((err) =>done (err,null));
    
});

module.exports = (passport) => {
    passport.use(strategy);
}