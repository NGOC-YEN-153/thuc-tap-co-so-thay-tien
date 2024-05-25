const HuyenModel = require('../../../models/HuyenModel');
const sequelize = require('../../../models/sequelize');
const User = require('../../../models/UserModel');
async function AddHuyen(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await HuyenModel.bulkCreate(arr, { transaction: t })
        });
        return undefined;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// (async () => await AddUser(Userss))()
module.exports = AddHuyen;