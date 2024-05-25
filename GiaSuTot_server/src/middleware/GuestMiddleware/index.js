const express = require('express');
const { getTinhTuers, filter_tutors, getTinhTuersById } = require('../../controllers/TinhTuController');
const { getAssessmentDetails, getUserInfo, getAssessmentDetailsModeGuest, getUserInfoModeGuest, getIntroductionInfomationModeGuest, getIntroductionInfomationModeUser, getUserInfoModeUser, getAssessmentTableModeUser } = require('../../controllers/UserController');
const RegisterMiddleware = require('../RegisterMiddleware');
const createToken = require('../createToken');
const { getAllArticlesModeGuest } = require('../../controllers/ArticleController');
const { PhoneNumberCustom } = require('../../controllers/PhoneNumberController');
const { getTinhHuyenXa } = require('../../controllers/TinhHuyenXaController.js');
const ClassModel = require('../../models/ClassModel.js');
const SubjectModel = require('../../models/SubjectModel.js');
const { save } = require('../../controllers/ThongKeController/index.js');
const UserModel = require('../../models/UserModel.js');
const GuestMiddleware = express.Router();
GuestMiddleware.get('/listtutor', getTinhTuers);
GuestMiddleware.get('/getAllTinhtuersById', getTinhTuersById);

GuestMiddleware.get('/filter', filter_tutors);
GuestMiddleware.get('/detailAssessment', getAssessmentDetailsModeGuest);
GuestMiddleware.post('/getToken', createToken);
GuestMiddleware.post('/register', RegisterMiddleware);
GuestMiddleware.get('/getAllArticles', getAllArticlesModeGuest);
GuestMiddleware.post('/phonenumbercustom', PhoneNumberCustom);
GuestMiddleware.get('/getTinhHuyenXa', getTinhHuyenXa);
GuestMiddleware.get('/getIntroductionInfomation', getIntroductionInfomationModeUser);
GuestMiddleware.get('/getUserInfo', getUserInfoModeUser);
GuestMiddleware.get('/getAssessmentTable', getAssessmentTableModeUser);
GuestMiddleware.post('/save', save);
GuestMiddleware.get('/rank', async (req, res) => {
    try {
        const data = await UserModel.findAll({
            attributes: { exclude: ['passWord'] },
            order: [
                ['star', 'DESC']
            ],
            limit: 10,
            paranoid: false,
            where: {
                role: 2
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json([]);
    }
});

GuestMiddleware.get('/getLop', async (req, res) => {
    try {
        const data = await ClassModel.findAll();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json(error);
    }
});
GuestMiddleware.get('/getMonHoc', async (req, res) => {
    try {
        const data = await SubjectModel.findAll();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json(error);
    }
});
module.exports = GuestMiddleware;
