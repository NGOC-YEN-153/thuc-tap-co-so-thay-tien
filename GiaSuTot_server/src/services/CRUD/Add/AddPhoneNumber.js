const sequelize = require('../../../models/sequelize');
const PhoneNumber = require('../../../models/PhoneNumberModel');
async function AddPhoneNumber(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await PhoneNumber.bulkCreate(arr, { transaction: t })
        });
        return undefined;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
module.exports = AddPhoneNumber;