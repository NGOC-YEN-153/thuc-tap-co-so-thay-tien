const sequelize = require('../../../models/sequelize');
const User = require('../../../models/UserModel');
async function UpdateUser(object) {
    try {
        await sequelize.transaction(async (t) => {
            await User.update(object, {
                where: { userId: object.userId }
            }, 
                {
                    transaction: t
                });
        });
        return true; 
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = UpdateUser;