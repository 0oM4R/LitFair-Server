const sequelize = require('Sequelize');
const User = require('../User/model-User').User
const Sequelize = new sequelize('sequelizedb', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  });


const Seeker =Sequelize.define('Seeker',{

})
Seeker.belongsTo(User);