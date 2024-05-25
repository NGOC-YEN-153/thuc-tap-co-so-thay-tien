const sequelize = require('../../../models/sequelize');
const Friend = require('../../../models/FriendModel');
 async function UpdateFriend(object) {
    try {
        await sequelize.transaction(async (t) => {
            await Friend.update(object, {
                where: { friendId: object.friendId }
            },
                {
                    transaction: t
                })
        });
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = UpdateFriend;