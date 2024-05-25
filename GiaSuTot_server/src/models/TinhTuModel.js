const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./UserModel');
const ClassSubject = require('./ClassSubjectModel');
const XaModel = require('./XaModel');
const TinhTuModel = sequelize.define('TinhTus', {
    tinhTuId: {
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
    classSubjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: ClassSubject,
            key: 'classSubjectId'
        }
    },
    xaId: {
        type: DataTypes.INTEGER,
        references: {
            model: XaModel,
            key: 'xaId'
        }
    },
    price: DataTypes.INTEGER,
    hour: DataTypes.DOUBLE,
    pick: DataTypes.BOOLEAN,
    freetime: DataTypes.STRING(2000),
    exp: DataTypes.DOUBLE,
    isCensored: {
        type: DataTypes.BOOLEAN,
    },
    gender: DataTypes.BOOLEAN
},
    {
        paranoid: true,
        freezeTableName: true,
    })

module.exports = TinhTuModel;