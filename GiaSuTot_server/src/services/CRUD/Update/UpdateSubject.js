const sequelize = require('../../../models/sequelize');
const Subject = require('../../../models/SubjectModel'); 
async function UpdateSubject(object) {
    try {
        await sequelize.transaction(async (t) => {
            await Subject.update(object, {
                where: { subjectId: object.subjectId }
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
module.exports = UpdateSubject;