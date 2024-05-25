const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const SubjectModel = sequelize.define('Subjects', {
    subjectId: {
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
module.exports = SubjectModel;