const User = require('./auth.MySql.js').User;

const getAllUsers = async (req, res) => {
    let data = await User.findAll({});
    console.log(data);
    res.json(data);
}
const addUser = async (req, res) => {
    const {id,username, password} = req.body;
    await User.create({id,username, password});
    res.json({msg: 'User created successfully',username: username});
}
module.exports ={getAllUsers ,addUser };