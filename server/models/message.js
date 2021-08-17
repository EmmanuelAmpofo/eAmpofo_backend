const config = require("../config/config");
const sequelize = require("../connections/sequelize")[config.dbConnection];
const { DataTypes } = require('sequelize');

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Message.sync();
module.exports = Message