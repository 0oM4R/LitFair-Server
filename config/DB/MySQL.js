const sequelize = require('sequelize');
const Sequelize = new sequelize('sequelizedb','root','',{
    host: '127.0.0.1',
    dialect:'mysql'

});

Sequelize.define('user',{
    id: {
        type: sequelize.STRING ,
        primaryKey: true
    },
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING
    }
})

let creatTable = ()=>{
    Sequelize.sync().then(res =>{
        console.log(res)
    }).catch(err =>{
        console.log(err);
    })
}

module.exports =creatTable