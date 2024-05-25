const FriendClassSubjectModel = require("../../models/FriendClassSubject");
const { getAssessments, getAssessmentsModeParent } = require("../../services/CRUD/Get/GetAssessment");
const { getAssessmentDetail } = require("../../services/CRUD/Get/GetAssessmentDetail");
const { getFriendByAttribute, calcChain } = require("../../services/CRUD/Get/GetFriend");
const { getUserByAttribute, getUserByAttributeGuest } = require("../../services/CRUD/Get/GetUser");
const { getFriendClassSubjectByTutorId } = require("../../services/CRUD/Get/getFriendClassSubject");
const UpdateUser = require("../../services/CRUD/Update/UpdateUser");
const admin = require('firebase-admin');
const AddAssessment = require("../../services/CRUD/Add/AddAssessMent");
const UserModel = require("../../models/UserModel");
const FriendModel = require("../../models/FriendModel");
const ClassSubjectModel = require("../../models/ClassSubjectModel");
const ClassModel = require("../../models/ClassModel");
const SubjectModel = require("../../models/SubjectModel");
const UpdateFriendClassSubject = require("../../services/CRUD/Update/UpdateFriendClassSubject");
const HistoryConnect = require("../../models/HistoryConnect");
const options = {
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000 * 365 // 1 nam
};
const getUserInfoModeUser = async (req, res) => {
    try {
        let userId = req.query.userId;
        if (userId === undefined || userId === 'undefined') userId = req.user.userId;
        if (userId === undefined) return res.status(200).json({ message: 'fail' });

        console.log('lấy info user');
        const users = await getUserByAttribute({ userId: userId });
        if (users.length > 0) users[0].passWord = '';
        // console.log('>>> lay thanh cong info user  ' + JSON.stringify(users, null, 2));
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
}
const getIntroductionInfomationModeUser = async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        const userInstance = (await getUserByAttribute({ userId: userId }))[0];
        const countHocVien = await getFriendClassSubjectByTutorId({ tutorId: userId }); // c
        const longestGoodAssessmentChain = await calcChain(userId);
        userInstance.dataValues.countHocVien = countHocVien;
        userInstance.dataValues.longestGoodAssessmentChain = longestGoodAssessmentChain;
        // console.log(name, countHocVien, linkAvatar, createdAt, exp, career, alias, lastOnline, star);
        console.log('lay introduction thanh cong');
        return res.status(200).json(userInstance);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
const getAssessmentTableModeUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log('hello');
        console.log(userId);
        const assessments = await getAssessments(userId);
        console.log('lay introduction thanh cong');
        return res.status(200).json(assessments);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
const getAssessmentTableModeParents = async (req, res) => {
    try {
        const userId = req?.user?.userId;
        const assessments = await getAssessmentsModeParent(userId);
        console.log('lay introduction thanh cong');
        return res.status(200).json(assessments);
    } catch (error) {
        console.log(error);
        return error;
    }
}
const getAssessmentDetailsModeUser = async (req, res) => {
    try {
        const friendClassSubjectId = Number(req.params.friendClassSubjectId.slice(2));
        console.log('>>>>' + friendClassSubjectId);
        const assessments = await getAssessmentDetail(friendClassSubjectId);
        console.log('lay introduction thanh cong');
        return res.status(200).json(assessments);
    } catch (error) {
        console.log(error);
        return error;
    }
}

////////////////////////////////////


const getIntroductionInfomationModeGuest = async (req, res) => {
    try {

        const userId = req.query.userId;
        const userInstance = (await getUserByAttributeGuest({ userId: userId }))[0];
        const countHocVien = (await getFriendByAttribute({ tutorId: userId })).length;
        const longestGoodAssessmentChain = await calcChain(userId);

        const [name, linkAvatar, createdAt, exp, career, lastOnline, star, rankImage] = [userInstance.name, userInstance.linkAvatar, userInstance.createdAt, userInstance.exp, userInstance.career, userInstance.lastOnline, userInstance.star, userInstance.rankImage];
        // console.log(name, countHocVien, linkAvatar, createdAt, exp, career, alias, lastOnline, star);
        console.log('lay introduction thanh cong');
        return res.status(200).json({ name, countHocVien, linkAvatar, createdAt, exp, career, lastOnline, star, rankImage, longestGoodAssessmentChain });
    } catch (error) {
        console.log(error);
    }
}

const getAssessmentDetailsModeGuest = async (req, res) => {
    try {
        const friendClassSubjectId = Number(req.query.friendClassSubjectId);
        const assessments = await getAssessmentDetail(friendClassSubjectId);
        console.log('lay introduction thanh cong');
        return res.status(200).json(assessments);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
const UpdateUserr = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profileCensore = req.user.profileCensore;
        const name = req.body.name;
        const passWord = req.body.passWord;
        const career = req.body.career;
        const exp = req.body.exp;
        const mota = req.body.mota;
        const visibleCareer = req.body.visibleCareer;
        const visibleChainGood = req.body.visibleChainGood;
        const visibleExp = req.body.visibleExp;
        const visibleJoin = req.body.visibleJoin;
        const visibleLastVisit = req.body.visibleLastVisit;
        const visibleCountHocVien = req.body.visibleCountHocVien;
        const visibleMota = req.body.visibleMota;
        const obj = {};
        if (userId !== undefined) obj.userId = userId;
        if (name !== undefined) obj.name = name;
        if (passWord !== undefined) obj.passWord = passWord;
        if (career !== undefined) obj.career = career;
        if (exp !== undefined) obj.exp = exp;
        if (mota !== undefined) obj.mota = mota;
        if (visibleCareer !== undefined) obj.visibleCareer = visibleCareer;
        if (visibleChainGood !== undefined) obj.visibleChainGood = visibleChainGood;
        if (visibleExp !== undefined) obj.visibleExp = visibleExp;
        if (visibleJoin !== undefined) obj.visibleJoin = visibleJoin;
        if (visibleLastVisit !== undefined) obj.visibleLastVisit = visibleLastVisit;
        if (visibleCountHocVien !== undefined) obj.visibleCountHocVien = visibleCountHocVien;
        if (visibleMota !== undefined) obj.visibleMota = visibleMota;
        if (req.body.typee === 'fix') obj.profileCensore = false;
        else obj.profileCensore = true;
        const ok = await UpdateUser(obj);
        if (!(ok instanceof Error)) return res.status(200).json(ok);
        else return res.status(400).json(ok);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const createAvatar = async (req, res) => {
    try {
        const files = req.files['files'][0];
        const imageFilePath = `${Date.now()}_${files.originalname}`;
        const bucket = admin.storage().bucket();
        await bucket.upload(files.path, { destination: imageFilePath });
        let signedUrl = await bucket.file(imageFilePath).getSignedUrl(options);
        image_url = signedUrl[0];
        console.log(image_url);
        await UpdateUser({ userId: req.user.userId, linkAvatar: image_url, profileCensore: false })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
const commentAssessment = async (req, res) => {
    const calcBuff = (buff) => {
        if (buff < 5) return 0;
        if (buff >= 5) return 10;
        else if (buff >= 10) return 20;
        else if (buff >= 20) return 30;
        else if (buff >= 30) return 50;
    }
    try {
        const friendClassSubjectId = req.body.friendClassSubjectId;
        const star = req.body.star;
        const content = req.body.comment;
        const tutorId = req.body.tutorId;
        const err = await AddAssessment([{ friendClassSubjectId: friendClassSubjectId, content: content, star: star, time: new Date() }]);
        const tutor = await UserModel.findAll({ where: { userId: tutorId } });
        let buff = tutor[0].buff;
        if (star >= 80) buff += 1;
        const s = tutor[0].star + Math.floor(star * (100 + calcBuff(buff)) / 100);
        let rankImage = tutor[0].rankImage;
        if (s >= 24 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top1.png?alt=media&token=95fe9d3e-9bf0-4d36-b9bb-ddc8be5fff8c'; // 24 thasng 
        else if (s >= 20 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top2.png?alt=media&token=3c7edd06-3b23-40e4-92d9-8c140b72ce97'; //20thasng 
        else if (s >= 15 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top3.png?alt=media&token=aa907889-536e-44fa-a608-434138e6b0f7'; // 15 thasng 
        else if (s >= 10 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top4.png?alt=media&token=039c3e6e-0dc0-47e5-8835-a41a79223d28';//10 thasngs
        else if (s >= 5 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top5.png?alt=media&token=c1c639b9-295b-469c-adfb-ea954ffc73fe';// 5 thang
        else if (s >= 3 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top6.png?alt=media&token=719ffb6a-0b1a-424e-ba7f-c152880bac75';//3 thang
        else if (s >= 2 * 10 * 100) rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top7.png?alt=media&token=dd9be0ca-cec1-48e0-8480-c4067b81690f';//2 thang 
        else rankImage = 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top8.png?alt=media&token=1a19f2b4-c4bf-4094-a07b-a78c0245066e';//
        await UpdateUser({ userId: tutorId, star: s, rankImage: rankImage, buff: buff });
        await UpdateFriendClassSubject({ friendClassSubjectId: friendClassSubjectId, timeToComment: new Date() });
        if (err instanceof Error) return res.status(400).json(err);
        else return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

}
const getConnect = async (req, res) => {
    try {
        const ph = req.query.ph?.trim();
        const gs = req.query.gs?.trim();
        const giaSuId = (await UserModel.findOne({ where: { userName: gs } })).userId;
        const phuHuynhId = (await UserModel.findOne({ where: { userName: ph } })).userId;
        const data = await FriendClassSubjectModel.findAll({
            include: [
                {
                    model: FriendModel,
                    required: true,
                    where: {
                        tutorId: giaSuId,
                        parentId: phuHuynhId
                    }
                },
                {
                    model: ClassSubjectModel,
                    required: true,
                    include: [
                        {
                            model: ClassModel,
                        },
                        {
                            model: SubjectModel,
                        }
                    ]
                }
            ]
        });
        const ans = [];
        for (let i = 0; i < data.length; i++) {
            const FriendClassSubject = data[i].dataValues;
            const friendClassSubjectId = FriendClassSubject.friendClassSubjectId;
            const tutorId = FriendClassSubject.Friend.tutorId;
            const parentId = FriendClassSubject.Friend.parentId;
            const lop = FriendClassSubject.ClassSubject.Class.name;
            const mon = FriendClassSubject.ClassSubject.Subject.name;
            const tutor = await UserModel.findByPk(tutorId);
            const parent = await UserModel.findByPk(parentId);
            ans.push({ friendClassSubjectId: friendClassSubjectId, createdAt: FriendClassSubject.createdAt, lop: lop, mon: mon, tutor: tutor, parent: parent, });
        }
        return res.status(200).json(ans);
    } catch (error) {
        console.log(error);
        return res.status(200).json([]);
    }

}
const addConnect = async (req, res) => {
    try {
        const gsUsername = req.body?.gsUsername;
        const phUsername = req.body?.phUsername;
        const mon = req.body?.mon;
        const lop = req.body?.lop;
        const tutorId = (await UserModel.findOne({ where: { userName: gsUsername } })).userId;
        const parentId = (await UserModel.findOne({ where: { userName: phUsername } })).userId;
        const lopId = (await ClassModel.findOne({ where: { name: lop } })).classId;
        const monId = (await SubjectModel.findOne({ where: { name: mon } })).subjectId;
        const friendId = (await FriendModel.create({ parentId: parentId, tutorId: tutorId })).friendId;
        const classSubjectId = (await ClassSubjectModel.create({ classId: lopId, subjectId: monId })).classSubjectId;
        const FCS = await FriendClassSubjectModel.create({ classSubjectId: classSubjectId, friendId: friendId, startTime: new Date(), userId: req?.user?.userId });
        await HistoryConnect.create({ userId: req.user.userId, friendClassSubjectId: FCS.dataValues.friendClassSubjectId, type: false });
        await UpdateUser({ userId: parentId, role: 1, profileCensore: true });
        return res.status(400).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

}
const deleteConnect = async (req, res) => {
    try {
        const friendClassSubjectId = req.body?.friendClassSubjectId;
        await FriendClassSubjectModel.destroy({ where: { friendClassSubjectId: friendClassSubjectId } });
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }

}

module.exports = {
    getIntroductionInfomationModeUser, getAssessmentTableModeUser, getAssessmentDetailsModeUser, getUserInfoModeUser,
    getIntroductionInfomationModeGuest, getAssessmentDetailsModeGuest, getAssessmentTableModeParents,
    UpdateUserr, createAvatar, commentAssessment, getConnect, addConnect, deleteConnect
} 