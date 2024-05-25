const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const UserModel = require('./UserModel');
const FriendClassSubjectModel = require('./FriendClassSubject');
const HistoryConnect = sequelize.define('HistoryConnects', {
    historyConnectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type : DataTypes.BOOLEAN , 
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'userId'
        }
    } ,
    friendClassSubjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: FriendClassSubjectModel,
            key: 'friendClassSubjectId'
        }
    }

},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = HistoryConnect;
