const PhoneNumberQueue = require('../../../models/PhoneNumberQueueModel');
const sequelize = require('../../../models/sequelize');
async function AddPhoneNumberQueue(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await PhoneNumberQueue.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = AddPhoneNumberQueue;