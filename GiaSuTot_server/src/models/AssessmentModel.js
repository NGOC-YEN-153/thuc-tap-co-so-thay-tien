const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const FriendClassSubjectModel = require('./FriendClassSubject');
const AssessmentModel = sequelize.define('Assessments', {
    assessmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    friendClassSubjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: FriendClassSubjectModel,
            key: 'friendClassSubjectId'
        }
    },
    content: DataTypes.STRING,
    star: DataTypes.INTEGER,
    time: {
        type : DataTypes.DATE ,
        defaultValue : new Date()
    }
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = AssessmentModel;