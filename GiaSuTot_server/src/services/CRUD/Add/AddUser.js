const sequelize = require('../../../models/sequelize');
const User = require('../../../models/UserModel');
async function AddUser(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await User.bulkCreate(arr, { transaction: t })
        });
        return undefined;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// (async () => await AddUser(Userss))()
module.exports = AddUser;