const sequelize = require('../../../models/sequelize');
const TinhTu = require('../../../models/TinhTuModel');
async function UpdateTinhTu(object) {
    try {
        await sequelize.transaction(async (t) => {
            await TinhTu.update(object, {
                where: { tinhTuId: object.tinhTuId }
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
module.exports = UpdateTinhTu;