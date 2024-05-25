const express = require('express');
const Authen = require('../Authen');
const { Op, Model } = require('sequelize');
const { getAllArticlesModeUser } = require('../../controllers/ArticleController');
const getAllThongKe = require('../../services/CRUD/Get/getAllThongKe');
const getAllPhoneNumberQueue = require('../../services/CRUD/Get/getAllPhoneNumberQueue');
const DeletePhoneNumberQueue = require('../../services/CRUD/Delete/DeletePhoneNumberQueue');
const ThongKeModel = require('../../models/ThongKeModel');
const DeleteThongKe = require('../../services/CRUD/Delete/DeleteThongKe');
const UserModel = require('../../models/UserModel');
const UpdateUser = require('../../services/CRUD/Update/UpdateUser');
const { getConnect, addConnect, deleteConnect } = require('../../controllers/UserController');
const TinhTuModel = require('../../models/TinhTuModel');
const UpdateTinhTu = require('../../services/CRUD/Update/UpdateTinhTu');
const AdminMiddleware = express.Router();
const middleware = (req, res, next) => {
    const user = req.user;
    if (user?.role !== 3) return res.status(400).json({ message: 'fail' });
    return next();
}
AdminMiddleware.use(Authen);
AdminMiddleware.use(middleware);
AdminMiddleware.get('/getAllArticles', getAllArticlesModeUser);
AdminMiddleware.get('/getAllThongKe', async (req, res) => {
    return res.status(200).json(await getAllThongKe());
});
AdminMiddleware.get('/getAllEmailSdt', async (req, res) => {
    return res.status(200).json(await getAllPhoneNumberQueue());
});
AdminMiddleware.post('/deletee', async (req, res) => {

    try {
        const phoneNumberQueueId = req.body.phoneNumberQueueId;
        await DeletePhoneNumberQueue([phoneNumberQueueId]);
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
    }
});
AdminMiddleware.post('/deleteee', async (req, res) => {
    try {
        const thongKeId = req.body.thongKeId;
        await DeleteThongKe([thongKeId]);
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
    }
});

///...
AdminMiddleware.get('/getThongKe', async (req, res) => {
    const thongKeId = req.query.thongKeId;
    if (thongKeId === 'undefined') res.status(200).json([]);
    const thongKe = await ThongKeModel.findAll({ where: { thongKeId: thongKeId } });
    return res.status(200).json(thongKe[0]);
});
AdminMiddleware.get('/getUserInfo', async (req, res) => {
    try {
        const user = await UserModel.findAll({ where: { profileCensore: false } });
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(200).json({ message: false });
    }
});
AdminMiddleware.post('/censore', async (req, res) => {
    try {
        const userId = req.body.userId;
        await UpdateUser({ userId: userId, profileCensore: true });
        const arr = await TinhTuModel.findAll({
            include: {
                model: UserModel,
                where: { userId: userId },
                required: true,
                attributes: { exclude: ['passWord'] }
            }
        });
        for (let i = 0; i < arr.length; i++) {
            const e = x[i];
            e.isCensored = true;
            await UpdateTinhTu(e);
        }
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);

    }
});
AdminMiddleware.post('/reject', async (req, res) => {
    try {
        const userId = req.body.userId;
        await UpdateUser({ userId: userId, profileCensore: false, timeToCensore: new Date() });
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
});
AdminMiddleware.get('/getConnect', getConnect);
AdminMiddleware.post('/addConnect', addConnect);
AdminMiddleware.post('/deleteConnect', deleteConnect);
AdminMiddleware.get('/getCensore', async (req, res) => {
    try {
        const data = await UserModel.findAll({ where: { profileCensore: false, timeToCensore: { [Op.lte]: new Date((new Date()).getTime() - 0.5 * 24 * 60 * 60 * 1000) } } });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json([]);
    }
});
AdminMiddleware.get('/checkUser', async (req, res) => {
    try {
        const userName = req.query.userName;
        const data = await UserModel.findOne({ where: { userName: userName } });
        if (!data) return res.status(200).json({ message: 'fail' });
        else return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
});
module.exports = AdminMiddleware;
// route ddoongj