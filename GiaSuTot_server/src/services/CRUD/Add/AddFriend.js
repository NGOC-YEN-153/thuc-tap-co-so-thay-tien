
const sequelize = require('../../../models/sequelize');
const Friend = require('../../../models/FriendModel');
const User = require('../../../models/UserModel');
async function AddFriend(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await Friend.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = AddFriend;