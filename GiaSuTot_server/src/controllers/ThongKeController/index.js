const ThongKeModel = require("../../models/ThongKeModel")

const save = async (req, res) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const gioiTinh = req.body.gioiTinh;
    const que = req.body.que;
    const phone = req.body.phone;
    const nghe = req.body.nghe;
    const living = req.body.living;
    const sv = req.body.sv;
    const gv = req.body.gv;
    const want = req.body.want;
    const exp = req.body.exp;
    const mota = req.body.mota;
    const thanhtich = req.body.thanhtich;
    const dataTime = req.body.dataTime;
    let DataThoiGianRanhString = "";
    for (let day = 2; day <= 8; day++) {
        for (let j = 0; j <= 23; j++) {
            if (dataTime[day][j] === true) DataThoiGianRanhString += day + String(j).padStart(2, '0') + '1';
            else DataThoiGianRanhString += day + String(j).padStart(2, '0') + '0';
        }
    }
    await ThongKeModel.create({ name, dob, gioiTinh, que, phone, nghe, living, sv, gv, want, exp, mota, thanhtich, dataTime: DataThoiGianRanhString });
    return res.status(200).json(1);
}
module.exports = { save }