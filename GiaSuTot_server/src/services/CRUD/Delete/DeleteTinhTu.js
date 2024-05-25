const sequelize = require('../../../models/sequelize');
const TinhTu = require('../../../models/TinhTuModel');
async function DeleteTinhTu(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                await TinhTu.destroy({
                    where: {
                        tinhTuId: id
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
module.exports = DeleteTinhTu;