const FriendClassSubjectModel = require("../../../models/FriendClassSubject");
const FriendModel = require("../../../models/FriendModel");

async function getFriendClassSubjectByAttribute(attribute) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findAll({
                where: attribute
            });
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    }
} 
async function getFriendClassSubjectByTutorId(x) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findAll({
                include: {
                    model: FriendModel, 
                    where: { tutorId: x.tutorId}, 
                    required: true,
                    paranoid : false
                }
            });
            return data.length;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
module.exports = { getFriendClassSubjectByAttribute, getFriendClassSubjectByTutorId }