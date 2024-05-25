const AssessmentModel = require("../../../models/AssessmentModel");
const ClassModel = require("../../../models/ClassModel");
const ClassSubjectModel = require("../../../models/ClassSubjectModel");
const FriendClassSubjectModel = require("../../../models/FriendClassSubject");
const FriendModel = require("../../../models/FriendModel");
const PhoneNumberModel = require("../../../models/PhoneNumberModel");
const SubjectModel = require("../../../models/SubjectModel");
const UserModel = require("../../../models/UserModel");
const {Op} = require('sequelize');
//soft delete
async function getAssessmentDetail(friendClassSubjectId) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findOne({
                where: { friendClassSubjectId: friendClassSubjectId },
                attributes: ['deletedAt', 'startTime'],
                order :  [[AssessmentModel , 'createdAt' , 'desc']],
                required: true,
                paranoid: false,
                include: [
                    {
                        model: AssessmentModel,
                        attributes: ['content', 'star','time'],
                        required: false,
                        paranoid: false,
                        where : {
                            time : {[Op.lte] : new Date((new Date()).getTime() - 0* 24 * 60 * 60 * 1000)}
                        }
                    }
                ]
            });
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)
        return null;
    }
}


async function getAssessmentDetailModeuser(friendClassSubjectId) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findOne({
                where: { friendClassSubjectId: friendClassSubjectId },
                attributes: ['deletedAt', 'startTime'],
                order :  [[AssessmentModel , 'createdAt' , 'desc']],
                required: true,
                paranoid: false,
                include: [
                    {
                        model: AssessmentModel,
                        attributes: ['content', 'star','time'],
                        required: false,
                        paranoid: false,
                    }
                ]
            });
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)
        return null;
    }
}
module.exports = { getAssessmentDetail , getAssessmentDetailModeuser }