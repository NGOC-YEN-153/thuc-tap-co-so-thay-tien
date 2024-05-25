import { createSlice } from "@reduxjs/toolkit"
import { selectMon, selectLop, selectThanhPho, selectHuyen, selectXa, selectGioiTinh, selectThoiGian, selectKinhNghiem, selectBoLoc } from "../Action/filterAction.js"
const intialFilter = {
    monHoc: "Môn",
    lop: "Lớp",
    thanhPho: "Thành phố",
    huyen: "Huyện",
    xa: "Xã",
    gioiTinh: "Giới tính",
    thoiGian: "Chưa chọn thời gian",
    kinhNghiem: "Kinh Nghiệm",
    locOrBoLoc: 'Bộ lọc'
}

const filterReduce = createSlice({
    name: "filter",
    initialState: intialFilter,
    reducers: {
        selectMon, selectLop, selectThanhPho, selectHuyen, selectXa, selectGioiTinh, selectThoiGian, selectKinhNghiem, selectBoLoc
    }
})

const filterActions = filterReduce.actions
export { filterReduce, filterActions }