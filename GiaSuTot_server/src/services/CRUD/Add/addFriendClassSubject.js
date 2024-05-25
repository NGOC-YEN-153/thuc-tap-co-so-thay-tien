const FriendClassSubjectModel = require('../../../models/FriendClassSubject');
const sequelize = require('../../../models/sequelize');
async function AddFriendClassSubject(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await FriendClassSubjectModel.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = AddFriendClassSubject;