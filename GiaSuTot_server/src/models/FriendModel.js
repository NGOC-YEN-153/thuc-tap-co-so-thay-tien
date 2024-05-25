const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./UserModel');
const FriendModel = sequelize.define('Friends', {
    friendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tutorId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
    },
    parentId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = FriendModel;