const HuyenModel = require("../../../models/HuyenModel");
const User = require("../../../models/UserModel");
const XaModel = require("../../../models/XaModel");

async function getAllXas() {
    try {
        const f = async () => {
            const data = await XaModel.findAll(
                { 
                    include: {
                        model: HuyenModel, 
                        required: true,
                    }
                }
            );
            return data;
        }
        const x = await f();
        const list = [];
        x.forEach(value => {
            list.push({ name: value.name, parent: value.Huyen.name });
        });
        const allTinh = await HuyenModel.findAll();
        allTinh.forEach(value => {
            list.push({ name: 'Bất kì', parent: value.name });
        })
        return list;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
module.exports = { getAllXas }