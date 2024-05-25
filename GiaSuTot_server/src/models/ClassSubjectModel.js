const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const Class = require('./ClassModel');
const Subject = require('./SubjectModel');
const ClassSubjectModel = sequelize.define('ClassSubjects', {
    classSubjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classId: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'classId'
        }
    },
    subjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Subject,
            key: 'subjectId'
        }
    }
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = ClassSubjectModel;