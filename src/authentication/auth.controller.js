const User = require('./auth.DB.js').User;
const creatTable = require('./auth.DB.js').creatTable;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const console = require('console');

/**
 * @param {*} salt - For password hashing algorithm
 * @param {*} privKeyPath - Private lic key path
 * @param {*} Priv_key - private key to creat signature of JWT
 **/
const salt = 8;
const privKeyPath = path.join(__dirname, '..', 'id_rsa_priv.pem');
const Priv_key = fs.readFileSync(privKeyPath, 'utf8');

//**************************Generate token**************************************** */
function issueJwt(user) {
  const email = user.email;
  const expiresIn = '1h'; 

  const payload = {
    sub: email,
    iat: Math.floor(Date.now() / 1000),
    
  };

  const signedToken = jsonwebtoken.sign(payload, Priv_key, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return signedToken;
  // return 'Bearer ' + signedToken;
}

const issueJwtGoogle = (req, res) => {
  const tokenObject = issueJwt(req.user);
  res.cookie("auth",tokenObject,{
  httpOnly:true,
  }).json({ user: req.user.email, tokenObject: tokenObject });
}

const getAllUsers = async (req, res) => {
  let data = await User.findAll({});
  res.json(data);
};

const addUser = async (req, res) => {
  creatTable();
  const { email, password } = req.body;
  console.log(email, password);
  bcrypt.hash(password, salt, async (err, hash) => {
    await User.create({ email, password: hash, external_type: 0, external_id: 0 });
  });

  res.json({ msg: 'User created successfully', email: email });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then(async (user) => {
 
      if (user) {
        const matches = await bcrypt.compare(password, user.password);
        if (matches) {
          res.clearCookie("auth");
          const tokenObject = issueJwt(user);
          res.cookie("auth",tokenObject,{
   
            httpOnly:true,
          }).json({ user: user, tokenObject: tokenObject });
        } else {
          res.json({ msg: 'email or password is incorrect' });
        }
      } else {
        res.status(401).json({ msg: 'Invalid email' });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};
const logout =(req, res) => {
  res.clearCookie("auth");
  res.send("loged out")
}
module.exports = {issueJwtGoogle, getAllUsers, addUser, login, logout };
