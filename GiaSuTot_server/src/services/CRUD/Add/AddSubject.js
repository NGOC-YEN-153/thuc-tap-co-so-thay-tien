const sequelize = require('../../../models/sequelize');
const Subject = require('../../../models/SubjectModel');
async function AddSubject(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await Subject.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    }
}
module.exports = AddSubject;