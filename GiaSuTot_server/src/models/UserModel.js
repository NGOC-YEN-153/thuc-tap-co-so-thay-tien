
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const UserModel = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
    },
    name: DataTypes.STRING,
    passWord: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: {
        type : DataTypes.BOOLEAN,
        defaultValue: false
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    },
    star: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    linkAvatar : {
        type: DataTypes.STRING(5000) , 
        defaultValue : 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/566-5668461_user-white-person-icon-clipart.png?alt=media&token=08c17c93-ddc0-4d21-9e61-ca450ab5d226'
    } ,
    profileCensore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    career:{
        type: DataTypes.STRING,
        defaultValue: '...'
    },
    exp: {
       type :  DataTypes.INTEGER,
       defaultValue : 0
    },
    lastOnline: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    rankImage: {
        type : DataTypes.STRING(5000),
        defaultValue : 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top8.png?alt=media&token=1a19f2b4-c4bf-4094-a07b-a78c0245066e'
    },
    mota: {
        type: DataTypes.STRING,
        defaultValue: '...'
    },
    visibleCareer: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    visibleExp: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    visibleJoin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    visibleLastVisit: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    visibleCountHocVien: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    visibleChainGood: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    visibleMota: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    timeToCensore : {
        type : DataTypes.DATE,
        defaultValue : new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000)
    },
    buff : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = UserModel;
