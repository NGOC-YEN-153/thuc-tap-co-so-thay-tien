const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const TinhModel = require('./TinhModel');
const HuyenModel = sequelize.define('Huyens', {
    huyenId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tinhId: {
        type: DataTypes.INTEGER,
        references: {
            model: TinhModel,
            key: 'tinhId'
        },
    },
    name: DataTypes.STRING(50)
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = HuyenModel;