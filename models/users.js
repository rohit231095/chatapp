const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Users = sequelize.define('users',{
    userId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    surname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Users;