const User = require('./auth.DB.js').User;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Token= require('./auth.DB').tokenModel;

/**
 * @param {*} salt - For password hashing algorithm
 * @param {*} privKeyPath - Private lic key path 
 * @param {*} Priv_key - private key to creat signature of JWT
 **/
const salt = 8; 
const privKeyPath= path.join(__dirname, '..','id_rsa_priv.pem');  
const Priv_key= fs.readFileSync(privKeyPath, 'utf8'); 
    
//**************************Generate token**************************************** */
function issueJwt(user) {
    const id = user.id;
    const expiresIn= '1d';

    const payload ={
        sub: id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, Priv_key,
         {
            expiresIn: expiresIn ,
            algorithm:'RS256'
        }) 

    return   "Bearer " + signedToken ;   

}

const getAllUsers = async (req, res) => {
    let data = await User.findAll({});
    console.log(data);
    res.json(data);
}

const addUser = async (req, res) => {
    const {id,username, password} = req.body;
    bcrypt.hash(password, salt, async(err,hash)=> {
        await User.create({id,username, password:hash});
    })
  
    res.json({msg: 'User created successfully',username: username});
}

const login =  (req, res) => {
    
    const {username,password} = req.body;
    User.findOne({where: {username: username}})
    .then((user) => {
        if(!user){
            res.status(401).json({msg:"Invalid username"})
        }else{
            const matches =  bcrypt.compare(password, user.password)
            if(matches){
            const tokenObject = issueJwt(user);
            newToken = new Token({_id:user.id, token:tokenObject})
            newToken.save();
            res.json({user: user, tokenObject: tokenObject});
            }
            else{ 
                res.json({msg:"Username or password is incorrect"})
            }
        }

        
    })
    .catch(err => {
        res.status(500).json({msg: err.message})
    })
}

    // chck if password is correct 
    
    

module.exports = { getAllUsers, addUser, login };