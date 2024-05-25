const PhoneNumberQueueModel = require('../../../models/PhoneNumberQueueModel');
const ThongKeModel = require('../../../models/ThongKeModel');
const sequelize = require('../../../models/sequelize');
async function DeleteThongKe(arr) {
    try {
        await sequelize.transaction(async (t) => {
            arr.forEach(async (id) => {
                ThongKeModel.destroy({
                    where: {
                        thongKeId: id
                    }
                }, {
                    transaction: t
                })
            });
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = DeleteThongKe;