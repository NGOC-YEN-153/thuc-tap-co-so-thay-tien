const { extensions } = require("sequelize/lib/utils/validator-extras");
const AddArticle = require("../../services/CRUD/Add/AddArticle");
const AddImageAndVideo = require("../../services/CRUD/Add/AddImageAndVideo");
const DeleteArticle = require("../../services/CRUD/Delete/DeleteArticle");
const { getArticleByAttributeModeUser, getArticleByAttributeModeGuest, getArticleByAttributeModeAdmin } = require("../../services/CRUD/Get/getArticles")
const admin = require('firebase-admin');
const UpdateUser = require("../../services/CRUD/Update/UpdateUser");
const UserModel = require("../../models/UserModel");
const options = {
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000 * 365 // 1 nam
};

const getAllArticlesModeGuest = async (req, res) => {
    try {
        const data = await getArticleByAttributeModeGuest(req.query.userId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
}
const getAllArticlesModeUser = async (req, res) => {
    try {
        const data = await getArticleByAttributeModeUser(req.query.userId);
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
}


const deleteArticleCtr = async (req, res) => {
    try {
        const articleId = req.body.articleId;
        const err = await DeleteArticle([articleId]);
        if (err instanceof Error) return res.status(200).json(err);
        else return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json(err);
    }
}
const createPost = async (req, res) => {
    try {
        await UpdateUser({ userId: req?.user?.userId, profileCensore: false });
        const texts = req.body.texts;
        const publicMode = req.body.publicMode;
        const a = await AddArticle([{
            title: texts,
            timePosted: new Date(),
            isCensored: false,
            status: publicMode,
            userId: req?.user?.userId
        }]);

        const articleId = a?.articleId;
        return res.status(200).json({ articleId: articleId });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
const createMedia = async (req, res) => {
    const getType = (fai) => {
        const extension = fai.originalname.split('.').pop().toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
            return 'image';
        } else if (extension === 'mp4' || extension === 'mp3' || extension === 'mov' || extension === 'avi') {
            return 'video';
        }
    };
    try {
        const articleId = req.body.articleId;
        const files = req.files['files'][0];
        const type = getType(files);
        const imageFilePath = `${Date.now()}_${files.originalname}`;
        const bucket = admin.storage().bucket();
        await bucket.upload(files.path, { destination: imageFilePath });
        let signedUrl = await bucket.file(imageFilePath).getSignedUrl(options);
        image_url = signedUrl[0];
        const err = await AddImageAndVideo([{ articleId: articleId, link: image_url, type: type === 'image' ? false : true }]);
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
};
module.exports = { getAllArticlesModeUser, getAllArticlesModeGuest, deleteArticleCtr, createPost, createMedia }  