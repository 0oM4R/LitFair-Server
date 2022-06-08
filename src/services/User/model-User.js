const { SQL_DB, Sequelize } = require('../../DB/SQL.config');

const User_model = SQL_DB.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(),
        unique: true,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address'
            }
        }
    },
    role: {
        type: Sequelize.STRING(9)
    },
    password: {
        type: Sequelize.STRING
    },
    external_type: {
        type: Sequelize.STRING,
        defult: null
    },
    external_id: {
        type: Sequelize.STRING,
        defult: null
    }
});

//create user table
User_model.sync();

module.exports = {
    User_model
};
