const sequelize = require('../../../models/sequelize');
const TinhModel = require('../../../models/TinhModel');
const User = require('../../../models/UserModel');
const XaModel = require('../../../models/XaModel');
async function AddXa(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await XaModel.bulkCreate(arr, { transaction: t })
        });
        return undefined;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// (async () => await AddUser(Userss))()
module.exports = AddXa;