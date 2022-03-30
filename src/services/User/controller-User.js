const User_model = require('./model-User.js').User_model;
const Seeker= require('../seeker/model-seeker').Seeker;
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
const privKeyPath = path.join(__dirname, '../..', 'id_rsa_priv.pem');
const Priv_key = fs.readFileSync(privKeyPath, 'utf8');

//**************************Generate token**************************************** */
function issueJwt(id) {

  const expiresIn = '1h'; 

  const payload = {
    id: id,
    iat: Math.floor(Date.now() / 1000),
    
  };

  const signedToken = jsonwebtoken.sign(payload, Priv_key, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return signedToken;
  // return 'Bearer ' + signedToken;
}

const getAllUsers = async (req, res) => {
  console.log(req.user.id)
  let data = await User_model.findAll({});
  res.json(data);
};

const addUser = async (req, res) => {

  let email = null;
  let password = "";
  let provider = null;
  let external_id = null;

  if(req.user){
    provider = req.user.provider;
    external_id = req.user.id;
    email = req.user.email;
    password = provider + external_id;
  } else {
    email = req.body.email;
    password = req.body.password;
    role = req.body.role;
    
  }
  bcrypt.hash(password, salt, async (err, hash) => {
     try{ 
        const user= await User_model.create({ email, password: hash,role, external_type: provider, external_id})
   
        res.send({msg:"success"}) 
      }
     catch(err){
       console.log(err.message)
       res.json({ msg: err.message });
     };
  });

  
};

const login = (req, res) => {

  let email =null;
  let password ="";
  let provider=null;

  if(req.user){
    provider = req.user.provider;
    email = req.user.email;
    console.log(email,provider);
  }else {
    email = req.body.email;
    password =req.body.password;
  }
  User_model.findOne({ where: { email: email } })
    .then(async (user) => {
      if (user) {
        const matches = await bcrypt.compare(password, user.password);
            if (matches || user.external_type === provider) {
              res.clearCookie("auth");
              const tokenObject = issueJwt(user.id);
              
              Seeker.findOne({where: { id:user.id}}).then((seeker)=>{
                if(!seeker){
                  Seeker.create({id:user.id ,email:user.email})
                }
              })

              
              res.cookie("auth",tokenObject,{
                httpOnly:true,
              })
              .json({ user: user, tokenObject: tokenObject });
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
}

const logout =(req, res) => {
  res.clearCookie("auth");
  res.send("loged out")
}
require('..//seeker/model-seeker')
module.exports = { getAllUsers, addUser, login, logout };