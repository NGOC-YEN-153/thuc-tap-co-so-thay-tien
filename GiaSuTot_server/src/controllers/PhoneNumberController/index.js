const AddPhoneNumberQueue = require('../../services/CRUD/Add/AddPhoneNumberPhoneQueue');
function check(phone) {
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char >= '0' && char <= '9') 1;
        else return false;
    }
    if (phone.length >= 12 || phone.length <= 8) return false;
    if (phone[0] !== '0') return false;
    return true;
}
async function PhoneNumberCustom(req, res) {
    const phone = req.body.name;
    await AddPhoneNumberQueue([{ name: phone, userId: req.body.userId }]);
    return res.status(200).json({ message: 'Chúng tôi sẽ liên hệ tới bạn trong vòng 6 tiếng sắp tới.' });
}
module.exports = { PhoneNumberCustom, };