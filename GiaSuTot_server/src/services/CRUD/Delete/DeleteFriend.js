const sequelize = require('../../../models/sequelize');
const Friend = require('../../../models/FriendModel');
async function DeleteFriend(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await Friend.destroy({
                    where: {
                        friendId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = DeleteFriend;