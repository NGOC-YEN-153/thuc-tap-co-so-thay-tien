const sequelize = require('../../../models/sequelize');
const Article = require('../../../models/ArticleModel');
async function DeleteArticle(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await Article.destroy({
                    where: {
                        articleId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = DeleteArticle;