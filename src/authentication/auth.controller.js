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
  const id = user.id;
  const expiresIn = '30000'; // expires in 30 seconds

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
    
  };

  const signedToken = jsonwebtoken.sign(payload, Priv_key, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return 'Bearer ' + signedToken;
}

const getAllUsers = async (req, res) => {
  let data = await User.findAll({});
  res.json(data);
};

const addUser = async (req, res) => {
  creatTable();
  const { id, username, password } = req.body;
  console.log(id, username, password);
  bcrypt.hash(password, salt, async (err, hash) => {
    await User.create({ id, username, password: hash });
  });

  res.json({ msg: 'User created successfully', username: username });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username: username } })
    .then(async (user) => {
      if (user) {
        const matches = await bcrypt.compare(password, user.password);

        if (matches) {
          const tokenObject = issueJwt(user);
          res.json({ user: user, tokenObject: tokenObject });
        } else {
          res.json({ msg: 'Username or password is incorrect' });
        }
      } else {
        res.status(401).json({ msg: 'Invalid username' });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

module.exports = { getAllUsers, addUser, login };
