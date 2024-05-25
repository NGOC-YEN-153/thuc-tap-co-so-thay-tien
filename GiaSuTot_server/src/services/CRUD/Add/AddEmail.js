const sequelize = require('../../../models/sequelize');
const EmailModel = require('../../../models/EmailModel');
async function AddEmail(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await EmailModel.bulkCreate(arr, { transaction: t })
        });
        return undefined;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
module.exports = AddEmail;