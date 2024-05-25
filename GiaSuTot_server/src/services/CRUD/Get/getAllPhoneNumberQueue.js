const PhoneNumberQueueModel = require("../../../models/PhoneNumberQueueModel");
const ThongKeModel = require("../../../models/ThongKeModel");

const getAllPhoneNumberQueue = async () => {
    try {
        const data = await PhoneNumberQueueModel.findAll();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
module.exports = getAllPhoneNumberQueue;