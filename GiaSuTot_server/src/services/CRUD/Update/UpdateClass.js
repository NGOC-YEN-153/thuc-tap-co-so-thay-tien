const sequelize = require('../../../models/sequelize');
const Class = require('../../../models/ClassModel'); async function UpdateClass(object) {
    try {
        await sequelize.transaction(async (t) => {
            await Class.update(object, {
                where: { classId: object.classId }
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
module.exports = UpdateClass;