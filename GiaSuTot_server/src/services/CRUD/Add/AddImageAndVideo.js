const FriendClassSubjectModel = require('../../../models/FriendClassSubject');
const ImageAndVideoModel = require('../../../models/ImageAndVideoModel');
const sequelize = require('../../../models/sequelize');
async function AddImageAndVideo(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await ImageAndVideoModel.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = AddImageAndVideo;