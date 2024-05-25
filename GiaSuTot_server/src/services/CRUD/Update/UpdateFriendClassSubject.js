const FriendClassSubjectModel = require('../../../models/FriendClassSubject');
const sequelize = require('../../../models/sequelize');
 async function UpdateFriendClassSubject(object) {
    try {
        await sequelize.transaction(async (t) => {
            await FriendClassSubjectModel.update(object, {
                where: { friendClassSubjectId: object.friendClassSubjectId }
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
module.exports = UpdateFriendClassSubject;