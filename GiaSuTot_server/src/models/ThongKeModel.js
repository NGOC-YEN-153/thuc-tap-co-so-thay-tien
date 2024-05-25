const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('./sequelize');
const ThongKeModel = sequelize.define('ThongKes', {
    thongKeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: DataTypes.STRING(500),
    dob: DataTypes.STRING(500), 
    gioiTinh: DataTypes.STRING(500), 
    que: DataTypes.STRING(500),    
    phone: DataTypes.STRING(500),
    nghe: DataTypes.STRING(500),
    living: DataTypes.STRING(500), 
    sv: DataTypes.STRING(500),
    gv: DataTypes.STRING(500), 
    want: DataTypes.STRING(500),
    exp: DataTypes.STRING(500),
    mota: DataTypes.STRING(500), 
    thanhtich: DataTypes.STRING(500),
    dataTime: DataTypes.STRING(1000)
},
    {
        paranoid: true,
        freezeTableName: true,
    })
module.exports = ThongKeModel;