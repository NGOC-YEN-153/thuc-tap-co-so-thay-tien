const sequelize = require('../../../models/sequelize');
const ClassSubject = require('../../../models/ClassSubjectModel');
async function AddClassSubject(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await ClassSubject.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = AddClassSubject;