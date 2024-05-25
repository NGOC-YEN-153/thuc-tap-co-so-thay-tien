const { getAllTinhTuersByAdditional, getAllTinhTuers, getAllTinhTuersById, getAllTinhTuersByIdHost } = require('../../services/CRUD/Get/GetTinhtuer');
const getTinhTuers = async (req, res) => {
    try {
        const data = await getAllTinhTuers();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: 'fail' })
    }
}
const getTinhTuersById = async (req, res) => {
    try {
        // console.log('>>>>    ' + typeof req.query.userIds);
        const data = await getAllTinhTuersById(JSON.parse(req.query.userIds));
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: 'fail' })
    }
}
async function filter_tutors(req, res) {
    try {
        const data = await getAllTinhTuersByAdditional(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: 'fail' });
    }
}
const getTinhTuerByHost = async (req, res) => {
    try {
        const data = await getAllTinhTuersByIdHost([req.user.userId]);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}
module.exports = {
    getTinhTuers, filter_tutors, getTinhTuersById, getTinhTuerByHost
}