const sequelize = require('../../../models/sequelize');
const Class = require('../../../models/ClassModel');
async function AddClass(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await Class.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = AddClass;