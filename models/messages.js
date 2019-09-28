const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Messages = sequelize.define('messages', {
    messageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING(4000),
        allowNull: false
    }
});

module.exports = Messages;