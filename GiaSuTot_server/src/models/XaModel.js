const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const HuyenModel = require('./HuyenModel');
const XaModel = sequelize.define('Xas', {
    xaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    huyenId: {
        type: DataTypes.INTEGER,
        references: {
            model: HuyenModel,
            key: 'huyenId'
        },
    },
    name: DataTypes.STRING(50)
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = XaModel;