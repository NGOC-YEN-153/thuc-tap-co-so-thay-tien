const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const PhoneNumberQueueModel = sequelize.define('PhoneNumberQueues', {
    phoneNumberQueueId: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: DataTypes.STRING, 
    userId: DataTypes.INTEGER,
}, 
    { 
        paranoid: true, 
        freezeTableName: true,
    })
module.exports = PhoneNumberQueueModel;