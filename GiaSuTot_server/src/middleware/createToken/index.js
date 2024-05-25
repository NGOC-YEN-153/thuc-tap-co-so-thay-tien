const jwt = require('jsonwebtoken');
const { getUserByAttribute } = require('../../services/CRUD/Get/GetUser');
const createToken = async (req, res) => {
    try {
        const data = await getUserByAttribute({ userName: req.body.account });
        if (data.length === 0) return res.status(200).json({ message: 'fail' });
        if (data[0].passWord != req.body.pass) return res.status(200).json({ message: 'fail' });
        const privateKey = process.env.privateKey;
        const payload = {
            userId: data[0].userId,
            role: data[0].role,
        }
        console.log('đang tạo token')
        const token = jwt.sign(payload, privateKey, { expiresIn: '5h' });
        console.log('tạo token thành công');
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'fail' });
    }
}
module.exports = createToken; 