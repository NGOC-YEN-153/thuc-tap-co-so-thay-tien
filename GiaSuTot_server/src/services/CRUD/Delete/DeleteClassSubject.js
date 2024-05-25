const sequelize = require('../../../models/sequelize');
const ClassSubject = require('../../../models/ClassSubjectModel');
const ClassSubject = require('../../../models/ClassSubjectModel'); async function DeleteClassSubject(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await ClassSubject.destroy({
                    where: {
                        classSubjectId: id
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
module.exports = DeleteClassSubject;