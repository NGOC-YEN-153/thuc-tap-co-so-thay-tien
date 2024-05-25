const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const ClassModel = sequelize.define('Classes', {
    classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING(50)
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = ClassModel;