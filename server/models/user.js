const config = require("../config/config");
const sequelize = require("../connections/sequelize")[config.dbConnection];
const { DataTypes } = require('sequelize');

const Group = require('./group');
const Message = require('./message');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  email: {
      type: DataTypes.STRING
  },
  password: {
      type: DataTypes.STRING
  }
}, {
  // Other model options go here
});



Group.belongsToMany(User, {through: 'UserGroups'});
User.belongsToMany(Group, {through: 'UserGroups'});

// // A user can send many messages
User.hasMany(Message, {as: "MessageSent", foreignKey: "senderId"});

// // A message can have only one sender
Message.belongsTo(User, {as: 'sender'});
// , foreignKey: "senderId"
// // A message sent to a user relationship. A message can be sent to many user.
Message.belongsToMany(User, {through: 'ReceipientMessages', as: "Receipient", foreignKey: "ReceipientId"})

// // A user received a message relationship. A user can receive many messages
User.belongsToMany(Message, {through: 'ReceipientMessages', as: "MessageReceived", foreignKey: "MessageId"})

Message.belongsToMany(Group, {through: 'GroupMessages'})

// // A user received a message relationship. A user can receive many messages
Group.belongsToMany(Message, {through: 'GroupMessages'})

sequelize.sync();
// sequelize.sync({force: true});
module.exports = User;