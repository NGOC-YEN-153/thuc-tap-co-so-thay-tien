const sequelize = require('../../../models/sequelize');
const PhoneNumber = require('../../../models/PhoneNumberModel'); 
async function UpdatePhoneNumber(object) {
    try {
        await sequelize.transaction(async (t) => {
            await PhoneNumber.update(object, {
                where: { phoneNumberId: object.phoneNumberId }
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
module.exports = UpdatePhoneNumber;