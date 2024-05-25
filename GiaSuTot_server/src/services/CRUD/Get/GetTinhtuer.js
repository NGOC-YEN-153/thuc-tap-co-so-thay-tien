const { Op, where, DOUBLE } = require("sequelize");
const ClassModel = require("../../../models/ClassModel");
const ClassSubjectModel = require("../../../models/ClassSubjectModel");
const SubjectModel = require("../../../models/SubjectModel");
const TinhTuModel = require("../../../models/TinhTuModel");
const UserModel = require("../../../models/UserModel");
const XaModel = require("../../../models/XaModel");
const HuyenModel = require("../../../models/HuyenModel");
const TinhModel = require("../../../models/TinhModel");

async function getAllTinhTuers() {
    console.log("đang tìm Alltinhtuers")
    try { 
        const f = async () => {
            const data = await TinhTuModel.findAll( 
                {
                    where: { isCensored: true },
                    include: [
                        {
                            model: XaModel,
                            required: true,
                            include: {
                                model: HuyenModel,
                                required: true,
                                include: {
                                    model: TinhModel,
                                    required: true,
                                }
                            }
                        },
                        {
                            model: UserModel,
                            attributes: { exclude: ['passWord'] },
                            where : {
                                profileCensore: true
                            },
                            required: true
                        },
                        {
                            model: ClassSubjectModel,
                            required: true,
                            include: [
                                {
                                    model: ClassModel,
                                    required: true
                                },
                                {
                                    model: SubjectModel,
                                    required: true
                                }
                            ]
                        }
                    ],
                    order: [['pick', 'desc'], [UserModel, 'star', 'desc'], ['price', 'asc'], ['createdAt', 'asc'], [UserModel, 'userName', 'asc']]
                }
            );
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)

    }
}
async function getAllTinhTuersById(userIds) {
    console.log("đang tìm Alltinhtuers by Id")
    try {
        const f = async () => {
            const data = await TinhTuModel.findAll(
                {
                    where: { isCensored: true },
                    include: [
                        {
                            model: XaModel,
                            required: true,
                            include: {
                                model: HuyenModel,
                                required: true,
                                include: {
                                    model: TinhModel,
                                    required: true,
                                }
                            }
                        },
                        {
                            model: UserModel,
                            attributes: { exclude: ['passWord'] },
                            required: true,
                            where: { userId: { [Op.in]: userIds } }
                        },
                        {
                            model: ClassSubjectModel,
                            required: true,
                            include: [
                                {
                                    model: ClassModel,
                                    required: true
                                },
                                {
                                    model: SubjectModel,
                                    required: true
                                }
                            ]
                        }
                    ],
                    order: [['pick', 'desc'], [UserModel, 'star', 'desc'], ['price', 'asc'], ['createdAt', 'asc'], [UserModel, 'userName', 'asc']]
                }
            );
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)

    }
}
async function getAllTinhTuersByIdHost(userIds) {
    console.log("đang tìm Alltinhtuers by IdHost")
    try {
        const f = async () => {
            const data = await TinhTuModel.findAll(
                {
                    include: [
                        {
                            model: XaModel,
                            required: true,
                            include: {
                                model: HuyenModel,
                                required: true,
                                include: {
                                    model: TinhModel,
                                    required: true,
                                }
                            }
                        },
                        {
                            model: UserModel,
                            attributes: { exclude: ['passWord'] },
                            required: true,
                            where: { userId: { [Op.in]: userIds } }
                        },
                        {
                            model: ClassSubjectModel,
                            required: true,
                            include: [
                                {
                                    model: ClassModel,
                                    required: true
                                },
                                {
                                    model: SubjectModel,
                                    required: true
                                }
                            ]
                        }
                    ],
                    order: [['pick', 'desc'], [UserModel, 'star', 'desc'], ['price', 'asc'], ['createdAt', 'asc'], [UserModel, 'userName', 'asc']]
                }
            );
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)

    }
}
async function getAllTinhTuersByAdditional(objectAdditonal) {
    try {

        const f = async () => {
            // DataThoiGianRanh, mon, lop, thanhPho, huyen, xa, gioiTinh, kinhNghiem
            const [object1, object31, object32, object33, object4, object5] = [{}, {}, {}, {}, {}, {}];
            let object3 = {};

            if (objectAdditonal.gioiTinh !== 'Bất kì' && objectAdditonal.gioiTinh !== 'Giới tính') {
                if (objectAdditonal.gioiTinh === 'Nam') object1.gender = true;
                else object1.gender = false;
            }
            if (objectAdditonal.kinhNghiem !== 'Bất kì' && objectAdditonal.kinhNghiem !== 'Kinh Nghiệm') {
                if (objectAdditonal.kinhNghiem === '0.5') {
                    object3 = {
                        exp: {
                            [Op.eq]: (objectAdditonal.kinhNghiem)
                        }
                    }
                };
                if (objectAdditonal.kinhNghiem === '1.5') {
                    object3 = {
                        exp: {
                            [Op.eq]: (objectAdditonal.kinhNghiem)
                        }
                    }
                };
                if (objectAdditonal.kinhNghiem === '2.5') {

                    object3 = {
                        exp: {
                            [Op.gte]: (objectAdditonal.kinhNghiem)
                        }
                    }
                };
                if (objectAdditonal.kinhNghiem === '5.5') {

                    object3 = {
                        exp: {
                            [Op.gte]: (objectAdditonal.kinhNghiem)
                        }
                    }
                };
            }

            object3.isCensored = true;
            if (objectAdditonal.xa !== 'Bất kì' && objectAdditonal.xa !== 'Xã') object31.name = objectAdditonal.xa;
            if (objectAdditonal.huyen !== 'Bất kì' && objectAdditonal.huyen !== 'Huyện') object32.name = objectAdditonal.huyen;
            if (objectAdditonal.thanhPho !== 'Bất kì' && objectAdditonal.thanhPho !== 'Thành phố') object33.name = objectAdditonal.thanhPho;

            if (objectAdditonal.mon !== 'Bất kì' && objectAdditonal.mon !== 'Môn') object4.name = objectAdditonal.mon;
            if (objectAdditonal.lop !== 'Bất kì' && objectAdditonal.lop !== 'Lớp') object5.name = objectAdditonal.lop;
            console.log(object1);
            console.log(object3);
            console.log(object31);
            console.log(object32);
            console.log(object33);
            console.log(object4);
            console.log(object5);
            // -------------------------------------------------------------------
            const dataAll = await TinhTuModel.findAll(
                {
                    where: object3,
                    include: [
                        {
                            model: XaModel,
                            where: object31,
                            required: true,
                            include: {
                                model: HuyenModel,
                                where: object32,
                                required: true,
                                include: {
                                    model: TinhModel,
                                    required: true,
                                    where: object33
                                }
                            }
                        },
                        {
                            model: UserModel,
                            where: object1,
                            attributes: { exclude: ['passWord'] },
                            required: true
                        },
                        {
                            model: ClassSubjectModel,
                            required: true,
                            include: [
                                {
                                    model: ClassModel,
                                    where: object5,
                                    required: true
                                },
                                {
                                    model: SubjectModel,
                                    where: object4,
                                    required: true
                                }
                            ]
                        }
                    ],
                    order: [['pick', 'desc'], [UserModel, 'star', 'desc'], ['price', 'asc'], ['createdAt', 'asc'], [UserModel, 'userName', 'asc']]
                }
            );
            const comparePercent = (phuHuynh, giaSu) => {
                let cnt = 0;
                for (let i = 3; i < giaSu.length; i += 4) {
                    if (phuHuynh[i] === '1' && phuHuynh[i] === giaSu[i]) cnt++;
                }
                return cnt;
            }
            let DataThoiGianRanhString = "";
            for (let day = 2; day <= 8; day++) {
                for (let j = 0; j <= 23; j++) {
                    if ((objectAdditonal.DataThoiGianRanh)[day][j] === 'true') DataThoiGianRanhString += day + String(j).padStart(2, '0') + '1';
                    else DataThoiGianRanhString += day + String(j).padStart(2, '0') + '0';
                }
            }
            console.log(DataThoiGianRanhString);
            let data = dataAll.filter(giasu => comparePercent(DataThoiGianRanhString, giasu.freetime) > 0);
            const compare = () => {
                //2001 2010 2021
                return (giaSuA, giaSuB) => {
                    const cnta = comparePercent(DataThoiGianRanhString, giaSuA);
                    const cntb = comparePercent(DataThoiGianRanhString, giaSuB);
                    return cntb - cnta;
                }
            }
            data.sort(compare);
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error)
    }
}
module.exports = { getAllTinhTuers, getAllTinhTuersByAdditional, getAllTinhTuersById, getAllTinhTuersByIdHost }