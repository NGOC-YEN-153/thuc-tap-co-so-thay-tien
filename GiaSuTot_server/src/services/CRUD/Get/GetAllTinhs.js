const TinhModel = require("../../../models/TinhModel");
const UserModel = require("../../../models/UserModel");
const User = require("../../../models/UserModel");
const XaModel = require("../../../models/XaModel");

async function getAllTinhs() {
    try {
        const f = async () => { 
            const data = await TinhModel.findAll();
            return data;
        }
        const x = await f();
        const list = [];
        x.forEach(value => {
            list.push(value.name);
        });
        list.push('Bất kì');
        return list;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
module.exports = { getAllTinhs }