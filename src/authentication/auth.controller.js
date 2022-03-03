const User = require('./auth.MySql.js').User;
const bcrypt = require('bcrypt')
const salt = 8; //salt for password hashing algorithm
/**
 * 
 * changing salt will lose 
 * 
 */
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

const login = async (req, res) => {
    
    const {username,password} = req.body;
    const user = await User.findOne({where: {username: username}})

    // chck if password is correct 
    
    const matches = await bcrypt.compare(password, user.password)
    if(matches){
        res.json({user: user});
    }
    else res.json({msg:"Username or password is incorrect"})
}


module.exports = { getAllUsers, addUser, login };