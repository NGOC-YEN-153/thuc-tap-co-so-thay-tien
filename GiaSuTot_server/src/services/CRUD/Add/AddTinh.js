const sequelize = require('../../../models/sequelize');
const TinhModel = require('../../../models/TinhModel');
const User = require('../../../models/UserModel');
async function AddTinh(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await TinhModel.bulkCreate(arr, { transaction: t });
        });
        return undefined;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = AddTinh;