const ThongKeModel = require("../../../models/ThongKeModel");

const getAllThongKe = async () => {
    try {
        const data = await ThongKeModel.findAll();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
module.exports = getAllThongKe;