const sequelize = require('../../../models/sequelize');
const EmailModel = require('../../../models/EmailModel');
async function DeleteEmail(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                EmailModel.destroy({
                    where: {
                        emailId: id
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
module.exports = DeleteEmail;