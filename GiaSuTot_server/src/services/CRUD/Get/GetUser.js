const User = require("../../../models/UserModel");

async function getUserByAttribute(attribute) {
    try {
        const f = async () => {
            const data = await User.findAll({
                where: attribute
            });
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
async function getUserByAttributeGuest(attribute) {
    try {
        const f = async () => {
            const data = await User.findAll({
                where: attribute
            });
            for (let i = 0; i < data.length; i++) {
                if (!data[i].visibleCareer) data[i].career = null;
                if (!data[i].visibleExp) data[i].exp = null;
                if (!data[i].visibleJoin) data[i].createdAt = null;      
                if (!data[i].visibleLastVisit) data[i].lastOnline = null; 
                if (!data[i].visibleMota) data[i].mota = null;
            }
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    } 
}
module.exports = { getUserByAttribute, getUserByAttributeGuest }