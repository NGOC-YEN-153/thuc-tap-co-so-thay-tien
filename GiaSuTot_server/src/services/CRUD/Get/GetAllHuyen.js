const HuyenModel = require("../../../models/HuyenModel");
const TinhModel = require("../../../models/TinhModel");
const User = require("../../../models/UserModel");
const XaModel = require("../../../models/XaModel");
const { getAllTinhs } = require("./GetAllTinhs");

async function getAllHuyens() {
    try {
        const f = async () => {
            const data = await HuyenModel.findAll(
                {
                    include: {
                        model: TinhModel,
                        required: true,
                    }
                }
            );
            return data;
        }
        const x = await f();
        const list = [];
        x.forEach(value => {
            list.push({ name: value.name, parent: value.Tinh.name });
        });        
        const allTinh = await TinhModel.findAll();
        allTinh.forEach(value => {
            list.push({ name: 'Bất kì', parent: value.name });
        })
        return list;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
module.exports = { getAllHuyens }