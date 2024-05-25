const sequelize = require('../../../models/sequelize');
const Class = require('../../../models/ClassModel'); async function DeleteClass(arr) {
    try {
        const sequelize = await initialDatabase();
        const Class = sequelize.models.Classes;
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await Class.destroy({
                    where: {
                        classId: id
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
module.exports = DeleteClass;