const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./UserModel');
const ArticleModel = sequelize.define('Articles', {
    articleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING(4000), 
    timePosted: DataTypes.DATE,
    isCensored: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    }

},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = ArticleModel;
