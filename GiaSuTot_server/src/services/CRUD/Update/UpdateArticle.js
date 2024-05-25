const sequelize = require('../../../models/sequelize');
const Article = require('../../../models/ArticleModel');
async function UpdateArticle(object) {
    try {
        await sequelize.transaction(async (t) => {
            await Article.update(object, {
                where: { articleId: object.articleId }
            },
                {
                    transaction: t
                })
        });
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = UpdateArticle;