const PhoneNumberQueueModel = require('../../../models/PhoneNumberQueueModel');
const sequelize = require('../../../models/sequelize');
async function DeletePhoneNumberQueue(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                PhoneNumberQueueModel.destroy({
                    where: {
                        phoneNumberQueueId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = DeletePhoneNumberQueue;