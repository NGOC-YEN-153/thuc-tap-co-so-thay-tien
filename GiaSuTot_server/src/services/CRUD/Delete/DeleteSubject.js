const sequelize = require('../../../models/sequelize');
const Subject = require('../../../models/SubjectModel');
async function DeleteSubject(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await Subject.destroy({
                    where: {
                        subjectId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = DeleteSubject;