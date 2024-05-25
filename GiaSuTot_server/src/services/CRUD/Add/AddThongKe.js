const sequelize = require('../../../models/sequelize');
const Article = require('../../../models/ArticleModel');
const ThongKeModel = require('../../../models/ThongKeModel');
async function AddThongKe(arr) {
    let a = [];
    try {
        await sequelize.transaction(async (t) => {
            a = await ThongKeModel.bulkCreate(arr, { transaction: t });
        });
        return a[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = AddThongKe;
