
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const ArticleModel = require('./ArticleModel');
const ImageAndVideoModel = sequelize.define('ImageAndVideoModels', {
    imageAndVideoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    articleId: {
        type: DataTypes.INTEGER,
        references: {
            model: ArticleModel,
            key: 'articleId'
        }
    },
    link: DataTypes.STRING(2000),
    type: DataTypes.BOOLEAN
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = ImageAndVideoModel;
