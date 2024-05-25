const sequelize = require('../../../models/sequelize');
const Article = require('../../../models/ArticleModel');
async function AddArticle(arr) {
    let a = [];
    try {
        await sequelize.transaction(async (t) => {
            a = await Article.bulkCreate(arr, { transaction: t });
        });
        return a[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = AddArticle;
