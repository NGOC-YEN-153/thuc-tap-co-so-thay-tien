const { Json } = require("sequelize/lib/utils");
const AssessmentModel = require("../../../models/AssessmentModel");
const ClassModel = require("../../../models/ClassModel");
const ClassSubjectModel = require("../../../models/ClassSubjectModel");
const FriendClassSubjectModel = require("../../../models/FriendClassSubject");
const FriendModel = require("../../../models/FriendModel");
const PhoneNumberModel = require("../../../models/PhoneNumberModel");
const SubjectModel = require("../../../models/SubjectModel");
const UserModel = require("../../../models/UserModel");
const sequelize = require("../../../models/sequelize");
//soft delete
async function getAssessments(userId) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findAll({
                group: ['friendClassSubjectId', 'deletedAt', 'Friend.friendId', 'ClassSubject.Subject.name', 'ClassSubject.Class.name', 'ClassSubject.classSubjectId'],
                order: [['allStar', 'DESC']],
                attributes: ['friendClassSubjectId', 'deletedAt', [sequelize.fn('SUM', sequelize.col('Assessments.star')), 'allStar']],
                required: true,
                paranoid: false,
                include: [
                    {
                        model: FriendModel,
                        required: true,
                        paranoid: false,
                        where: { tutorId: userId },
                    },
                    {
                        model: ClassSubjectModel,
                        attributes: ['classSubjectId'],
                        required: true,
                        paranoid: false,
                        include: [
                            {
                                model: ClassModel,
                                attributes: ['name'],
                                required: true,
                                paranoid: false,
                            },
                            {
                                model: SubjectModel,
                                attributes: ['name'],
                                required: true,
                                paranoid: false,
                            }
                        ]
                    },
                    {
                        model: AssessmentModel,
                        attributes: [],
                        required: false,
                        paranoid: false,
                    }
                ]
            });
            const assessments = [];
            for (let i = 0; i < data.length; i++) {
                {
                    const value = data[i];
                    const tutorId = value.dataValues.Friend.tutorId;
                    const parentId = value.dataValues.Friend.parentId;
                    const tutor = await UserModel.findAll({
                        where: { userId: tutorId }
                    });
                    const parent = await UserModel.findAll({
                        where: { userId: parentId }
                    });
                    assessments.push({
                        friendClassSubjectId: value.dataValues.friendClassSubjectId,
                        tutorId: value.dataValues.Friend.tutorId,
                        parentId: value.dataValues.Friend.parentId,
                        tutorName: tutor[0].name,
                        star : tutor[0].star , 
                        linkAvatarTutor :tutor[0].linkAvatar ,  
                        parentName: parent[0].userName,
                        class: value.dataValues.ClassSubject.Class.name,
                        subject: value.dataValues.ClassSubject.Subject.name,
                        allStar: value.dataValues.allStar || 0,
                        status: value.dataValues.deletedAt || true,
                    });
                }
            };
            // dang code o day
            return assessments;
        }
        return await f();
    } catch (error) {
        console.log(error)
        return null;
    }
}


async function getAssessmentsModeParent(userId) {
    try {
        const f = async () => {
            const data = await FriendClassSubjectModel.findAll({
                group: ['friendClassSubjectId', 'deletedAt', 'Friend.friendId', 'ClassSubject.Subject.name', 'ClassSubject.Class.name', 'ClassSubject.classSubjectId'],
                order: [['allStar', 'DESC']],
                attributes: ['friendClassSubjectId', 'deletedAt', [sequelize.fn('SUM', sequelize.col('Assessments.star')), 'allStar']],
                required: true,
                paranoid: false,
                include: [
                    {
                        model: FriendModel,
                        required: true,
                        paranoid: false,
                        where: { parentId: userId },
                    },
                    {
                        model: ClassSubjectModel,
                        attributes: ['classSubjectId'],
                        required: true,
                        paranoid: false,
                        include: [
                            {
                                model: ClassModel,
                                attributes: ['name'],
                                required: true,
                                paranoid: false,
                            },
                            {
                                model: SubjectModel,
                                attributes: ['name'],
                                required: true,
                                paranoid: false,
                            }
                        ]
                    },
                    {
                        model: AssessmentModel,
                        attributes: [],
                        required: false,
                        paranoid: false,
                    }
                ]
            });
            const assessments = [];
            for (let i = 0; i < data.length; i++) {
                {
                    const value = data[i];
                    const tutorId = value.dataValues.Friend.tutorId;
                    const parentId = value.dataValues.Friend.parentId;
                    const tutor = await UserModel.findAll({
                        where: { userId: tutorId }
                    });
                    const parent = await UserModel.findAll({
                        where: { userId: parentId }
                    });
                    // console.log(JSON.stringify(data, null, 2));
                    assessments.push({
                        friendClassSubjectId: value.dataValues.friendClassSubjectId,
                        tutorId: value.dataValues.Friend.tutorId,
                        parentId: value.dataValues.Friend.parentId,
                        tutorName: tutor[0].name,
                        star: tutor[0].star,
                        linkAvatarTutor: tutor[0].linkAvatar,
                        parentName: parent[0].userName,
                        class: value.dataValues.ClassSubject.Class.name,
                        subject: value.dataValues.ClassSubject.Subject.name,
                        allStar: value.dataValues.allStar || 0,
                        status: value.dataValues.deletedAt || true,
                    });
                }
            };
            // dang code o day
            return assessments;
        }
        return await f();
    } catch (error) {
        console.log(error)
        return null;
    }
}
module.exports = { getAssessments, getAssessmentsModeParent }