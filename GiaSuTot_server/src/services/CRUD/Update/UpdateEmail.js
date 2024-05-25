const sequelize = require('../../../models/sequelize');
const EmailModel = require('../../../models/EmailModel');
async function UpdateEmail(object) {
    try {
        await sequelize.transaction(async (t) => {
            await EmailModel.update(object, {
                where: { emailId: object.emailId }
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
module.exports = UpdateEmail;