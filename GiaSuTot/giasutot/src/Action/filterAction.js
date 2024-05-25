function selectMon(state, action) {
    state.monHoc = action.payload;
}
function selectLop(state, action) {
    state.lop = action.payload;
}
function selectThanhPho(state, action) {
    state.thanhPho = action.payload;
}
function selectHuyen(state, action) {
    state.huyen = action.payload;
}
function selectXa(state, action) {
    state.xa = action.payload;
}
function selectGioiTinh(state, action) {
    state.gioiTinh = action.payload;
}
function selectThoiGian(state, action) {
    state.thoiGian = action.payload;
}
function selectKinhNghiem(state, action) {
    state.kinhNghiem = action.payload;
}
function selectBoLoc(state, action) {
    state.locOrBoLoc = action.payload;
}
export {
    selectMon,
    selectLop,
    selectThanhPho,
    selectHuyen,
    selectXa,
    selectGioiTinh,
    selectThoiGian,
    selectKinhNghiem,
    selectBoLoc,
}

