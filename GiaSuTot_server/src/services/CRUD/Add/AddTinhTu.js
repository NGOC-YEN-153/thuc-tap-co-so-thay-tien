const sequelize = require('../../../models/sequelize');
const TinhTu = require('../../../models/TinhTuModel');
async function AddTinhTu(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await TinhTu.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error);
        // console.log( )
        return false;
    }
}
module.exports = AddTinhTu;