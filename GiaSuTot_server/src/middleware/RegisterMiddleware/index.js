const AddEmail = require('../../services/CRUD/Add/AddEmail');
const AddPhoneNumber = require('../../services/CRUD/Add/AddPhoneNumber');
const addUser = require('../../services/CRUD/Add/AddUser');
const md5 = require('md5');
const { getUserByAttribute } = require('../../services/CRUD/Get/GetUser');
const RegisterMiddleware = async (req, res, next) => {
    const name = 'user_' + md5(req.body.usernameData);
    const User = { userName: req.body.usernameData, name: name, passWord: req.body.passwordData, dob: req.body.dobData, gender: req.body.genderData };
    const a = await addUser([User]);
    if (a) return res.status(200).json({ message: 'fail' });
    const user = await getUserByAttribute({ userName: req.body.usernameData });
    const userId = user[0].userId;

    const PhoneNumber = { name: req.body.phoneData, userId };
    const b = await AddPhoneNumber([PhoneNumber]);
    if (b) return res.status(200).json({ message: 'fail' });

    const Email = { name: req.body.emailData, userId };
    const c = await AddEmail([Email]);
    if (c) return res.status(200).json({ message: 'fail' });

    return res.status(200).json({ message: 'success' });
}
module.exports = RegisterMiddleware;