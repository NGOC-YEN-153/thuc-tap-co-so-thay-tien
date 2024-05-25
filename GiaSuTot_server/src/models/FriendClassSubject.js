const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const ClassSubjectModel = require('./ClassSubjectModel');
const FriendModel = require('./FriendModel');
const UserModel = require('./UserModel');
const FriendClassSubjectModel = sequelize.define('FriendClassSubjects', {
    friendClassSubjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classSubjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: ClassSubjectModel,
            key: 'classSubjectId'
        }
    },
    friendId: {
        type: DataTypes.INTEGER,
        references: {
            model: FriendModel,
            key: 'friendId'
        }
    },
    startTime: DataTypes.DATE,
    timeToComment : {
        type : DataTypes.DATE,
        defaultValue : new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000)
    }
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = FriendClassSubjectModel;