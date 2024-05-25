const sequelize = require('../../../models/sequelize');
const ClassSubject = require('../../../models/ClassSubjectModel');async function UpdateClassSubject(object) {
    try {
        await sequelize.transaction(async (t) => {
            await ClassSubject.update(object, {
                where: { classSubjectId: object.classSubjectId }
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
module.exports = UpdateClassSubject;