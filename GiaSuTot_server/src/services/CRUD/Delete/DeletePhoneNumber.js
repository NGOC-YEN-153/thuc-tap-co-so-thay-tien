const sequelize = require('../../../models/sequelize');
const PhoneNumber = require('../../../models/PhoneNumberModel');
async function DeletePhoneNumber(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                PhoneNumber.destroy({
                    where: {
                        phoneNumberId: id
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
module.exports = DeletePhoneNumber;