const relations = {};

relations.users = require('../models/users');
relations.messages = require('../models/messages');

relations.messages.belongsTo(relations.users, { as: 'sender', foreignKey: 'senderId' });
relations.messages.belongsTo(relations.users, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = relations;