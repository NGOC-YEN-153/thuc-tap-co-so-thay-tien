const sequelize = require('../../../models/sequelize');
const Friend = require('../../../models/FriendModel');
const ImageAndVideoModel = require('../../../models/ImageAndVideoModel');
async function DeleteImageAndVideo(arr) {
    try { 
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await ImageAndVideoModel.destroy({
                    where: {
                        imageAndVideoId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        console.log(error)
        return error;
    }
}
module.exports = DeleteImageAndVideo;