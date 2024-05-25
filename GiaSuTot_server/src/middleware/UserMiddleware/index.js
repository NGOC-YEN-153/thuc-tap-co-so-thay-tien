const express = require('express');
const { getUserInfoModeUser, getAssessmentTableModeUser, getIntroductionInfomationModeUser, UpdateUserr, createAvatar, commentAssessment, getAssessmentDetailsModeUser, getBuff, getAssessmentTableModeParents } = require('../../controllers/UserController');
const Authen = require('../Authen');
const multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
const { getAllArticlesModeUser, deleteArticle, deleteArticleCtr, createPost, createMedia } = require('../../controllers/ArticleController');
const deleteImageAndVideo = require('../../controllers/ImageAndVideoController');
const TinhModel = require('../../models/TinhModel');
const HuyenModel = require('../../models/HuyenModel');
const XaModel = require('../../models/XaModel');
const ClassSubjectModel = require('../../models/ClassSubjectModel');
const EmailModel = require('../../models/EmailModel');
const ClassModel = require('../../models/ClassModel');
const SubjectModel = require('../../models/SubjectModel');
const TinhTuModel = require('../../models/TinhTuModel');
const AddTinhTu = require('../../services/CRUD/Add/AddTinhTu');
const { getTinhTuerByHost } = require('../../controllers/TinhTuController');
const { getAssessmentsModeParent } = require('../../services/CRUD/Get/GetAssessment');
const UserModel = require('../../models/UserModel');
const FriendClassSubjectModel = require('../../models/FriendClassSubject');
const FriendModel = require('../../models/FriendModel');
const { getAssessmentDetailModeuser } = require('../../services/CRUD/Get/GetAssessmentDetail');
const DeleteTinhTu = require('../../services/CRUD/Delete/DeleteTinhTu');
const UpdateArticle = require('../../services/CRUD/Update/UpdateArticle');
const PhoneNumberModel = require('../../models/PhoneNumberModel');
const UpdateUser = require('../../services/CRUD/Update/UpdateUser');
const UserMiddleware = express.Router();

UserMiddleware.use(Authen);
UserMiddleware.post('/checkRelative', async (req, res) => {
    try {
        const tutorId = req.body.tutorId;
        const parentId = req.body.parentId;
        const friendClassSubjectId = req.body.friendClassSubjectId;
        const ok = await FriendClassSubjectModel.findOne({
            where: { friendClassSubjectId: friendClassSubjectId },
            include: [
                {
                    model: FriendModel,
                    required: true,
                    where: {
                        tutorId: tutorId,
                        parentId: parentId
                    }
                }
            ]
        });
        const x = ok?.dataValues?.timeToComment?.getTime();
        const y = (new Date())?.getTime();
        if (ok && y - x >= 15 * 24 * 60 * 60 * 1000) return res.status(200).json(2);
        else if (ok) return res.status(200).json(1);
        else return res.status(200).json(0);
    } catch (error) {
        console.error(error);
        return res.status(200).json(null);
    }

});
UserMiddleware.post('/deleteTinhTu', async (req, res) => {
    try {
        const tinhTuId = req.body.tinhTuId;
        await DeleteTinhTu([tinhTuId]);
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
});

UserMiddleware.get('/getIntroductionInfomation', getIntroductionInfomationModeUser);
UserMiddleware.get('/getUserInfo', getUserInfoModeUser);
UserMiddleware.get('/getPhone', async (req, res) => {
    try {
        const userId = req.query.userId;
        const ans = await PhoneNumberModel.findOne({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(ans.name);
    } catch (error) {
        console.error(error);
        return res.status(200).json(null);
    }
});
UserMiddleware.get('/getEmail', async (req, res) => {
    try {
        const userId = req.query.userId;
        const ans = await EmailModel.findOne({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(ans.name);
    } catch (error) {
        console.error(error);
        return res.status(200).json(null);
    }
});
UserMiddleware.post('/changePass', async (req, res) => {
    try {
        const OLD = req.body.OLD;
        const NEW = req.body.NEW;
        const userId = req.user?.userId;
        const ok = await UserModel.findOne({
            where: {
                userId: userId,
                passWord: OLD
            }
        });
        if (!ok) return res.status(200).json({ message: 'fail' });
        await UpdateUser({ userId: userId, passWord: NEW });
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }

});
UserMiddleware.get('/getAllArticles', getAllArticlesModeUser);
UserMiddleware.post('/updateUser', UpdateUserr);
UserMiddleware.post('/deleteImageAndVideo', deleteImageAndVideo);
UserMiddleware.post('/deleteArticle', deleteArticleCtr);
UserMiddleware.post('/createPost', upload.fields([{ name: 'files', maxCount: 66 }]), createPost);
UserMiddleware.post('/createMedia', upload.fields([{ name: 'files', maxCount: 66 }]), createMedia);
UserMiddleware.post('/createAvatar', upload.fields([{ name: 'files', maxCount: 66 }]), createAvatar);
UserMiddleware.get('/getAssessmentTableModeTutor', getAssessmentTableModeUser);
UserMiddleware.get('/getAssessmentTableModeParent', getAssessmentTableModeParents);
UserMiddleware.get('/commentModeOfficial', async (req, res) => {
    try {
        const friendClassSubjectId = Number(req.query.friendClassSubjectId);
        const assessments = await getAssessmentDetailModeuser(friendClassSubjectId);
        console.log('lay introduction thanh cong');
        return res.status(200).json(assessments);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }

});
UserMiddleware.post('/addTinhTuPost', async (req, res) => {
    const [stateHuyen, stateLop, stateMonHoc, stateXa, stateThanhPho, exp, dataTime, price, hour, isCensored, gender] = [req.body.stateHuyen, req.body.stateLop, req.body.stateMonHoc, req.body.stateXa, req.body.stateThanhPho, req.body.exp, req.body.dataTime, req.body.price, req.body.hour, req.body.isCensored, req.body.gender];
    let timeString = '';
    for (let day = 2; day <= 8; day++) {
        for (let j = 0; j <= 23; j++) {
            if (dataTime[day][j] === true) timeString += day + String(j).padStart(2, '0') + '1';
            else timeString += day + String(j).padStart(2, '0') + '0';
        }
    }
    const thc = await TinhModel.findAll({
        where: { name: stateThanhPho },
        include: {
            model: HuyenModel,
            required: true,
            where: { name: stateHuyen },
            include: {
                model: XaModel,
                required: true,
                where: { name: stateXa }
            }
        }
    });
    const cs = await ClassModel.findAll({
        where: { name: stateLop },
        include: {
            model: SubjectModel,
            where: { name: stateMonHoc },
            required: true
        }
    });
    const csId = cs[0]?.Subjects[0]?.ClassSubjects?.classSubjectId;
    const xaId = thc[0]?.Huyens[0].Xas[0].xaId;
    const obj = {
        userId: req.user.userId,
        xaId: xaId,
        classSubjectId: csId,
        pick: false,
        price: price,
        hour: hour,
        freetime: timeString,
        exp: exp,
        isCensored: isCensored,
        gender: gender
    };
    const err = await AddTinhTu([obj]);
    if (err instanceof Error) return res.status(200).json(err);
    else return res.status(200).json(1);
});
UserMiddleware.post('/updateArticle', async (req, res) => {
    try {
        const articleId = req.body.articleId;
        const status = req.body.status;
        await UpdateArticle({ articleId: articleId, status: status });
        return res.status(200).json(1);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
});
UserMiddleware.get('/getInfoCookies', async (req, res) => {
    try {
        const userId = req.user?.userId;
        const x = await UserModel.findByPk(userId);
        return res.status(200).json(x);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
});
UserMiddleware.get('/getTinhTuerByIdHost', getTinhTuerByHost);
UserMiddleware.post('/createCommentAssessment', commentAssessment);
module.exports = UserMiddleware;
