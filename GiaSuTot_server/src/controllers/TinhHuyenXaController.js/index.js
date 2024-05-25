const { getAllHuyens } = require("../../services/CRUD/Get/GetAllHuyen");
const { getAllTinhs } = require("../../services/CRUD/Get/GetAllTinhs");
const { getAllXas } = require("../../services/CRUD/Get/GetXa");

const getTinhHuyenXa = async (req, res) => {
    try {
        const citys = await getAllTinhs();
        const huyens = await getAllHuyens();
        const xas = await getAllXas();
        return res.status(200).json({ xas, huyens, citys });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: 'fail' })
    }
}
module.exports = {
    getTinhHuyenXa
}