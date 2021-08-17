const config = require("../config/config");
const sequelize = require("../connections/sequelize")[config.dbConnection];
const { DataTypes } = require('sequelize');

const Group = sequelize.define('Group', {
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Group.sync();
module.exports = Group