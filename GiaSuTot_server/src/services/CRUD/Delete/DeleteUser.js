const sequelize = require('../../../models/sequelize');
const User = require('../../../models/UserModel');
async function DeleteUser(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await User.destroy({
                    where: {
                        userId: id
                    },
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = DeleteUser;