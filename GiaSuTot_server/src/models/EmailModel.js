const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./UserModel');
const EmailModel = sequelize.define('Emails', {
    emailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
    name: DataTypes.STRING,
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = EmailModel;