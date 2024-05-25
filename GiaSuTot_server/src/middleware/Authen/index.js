const jwt = require("jsonwebtoken");
const Authen = (req, res, next) => {
    console.log(' đang authen')
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('fail authjen');
            return res.status(401).json({
                message: 'fail authen'
            })
        }
        const decoded = jwt.verify(token, process.env.privateKey);
        if (decoded) {
            req.user = decoded;
            console.log(' authen thành công');
            return next();
        }
        else {
            console.log('fail authjen');
            return res.status(200).json({
                message: 'authen'
            })
        }
    }
    catch (error) {
        console.log('fail authjen');
        console.error(error);
        return res.status(401).json(error)
    }
}
module.exports = Authen;