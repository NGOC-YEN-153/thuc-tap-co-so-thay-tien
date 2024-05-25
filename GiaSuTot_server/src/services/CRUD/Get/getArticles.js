const { col } = require("sequelize");
const ArticleModel = require("../../../models/ArticleModel");
const ImageAndVideoModel = require("../../../models/ImageAndVideoModel");
const UserModel = require("../../../models/UserModel");
const sequelize = require("../../../models/sequelize");
const getArticleByAttributeModeGuest = async (userId) => {
    try {
        console.log(' >>> dang lay article')
        const data = await UserModel.findAll({
            order : [[{model : ArticleModel , as : 'sideA'},'createdAt' , 'DESC']] , 
            where: {
                userId: userId
            },
            attributes: ['userId'],
            include: {
                model: ArticleModel,
                as: 'sideA',
                

                required: false,
                where: { status: true },
                include: {
                    model: ImageAndVideoModel,
                    required: false,
                }
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
const getArticleByAttributeModeUser = async (userId) => {
    console.log(' >>> dang lay article')
    try {
        const data = await UserModel.findAll({
            order : [[{model : ArticleModel , as : 'sideA'},'createdAt' , 'DESC']] , 
            where: {
                userId: userId
            },
            attributes: ['userId'],
            include: {
                model: ArticleModel,
                required: false,
                as: 'sideA',
                include: {
                    model: ImageAndVideoModel,
                    required: false,
                }
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
const getArticleByAttributeModeAdmin = async (userId) => {
    console.log(' >>> dang lay article')
    try {
        const data = await UserModel.findAll({
            order : [[{model : ArticleModel , as : 'sideA'},'createdAt' , 'DESC']] , 
            where: {
                userId: userId
            },
            attributes: ['userId'],
            include: {
                model: ArticleModel,
                as: 'sideA',
                required: false,
                include: {
                    model: ImageAndVideoModel,
                    required: false,
                }
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = { getArticleByAttributeModeAdmin, getArticleByAttributeModeGuest, getArticleByAttributeModeUser }