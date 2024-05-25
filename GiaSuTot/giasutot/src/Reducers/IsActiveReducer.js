import { createSlice } from "@reduxjs/toolkit"
const intialisActive = {
    isActiveBodyFooter: true,
    isActiveLoginForm: false,
    isActiveLogin: true,
    isActiveFailLogin: false,
    isActiveProfileModal: false,
    isActiveProfileWall: true,
    isActiveRegisterForm: false,
    linkAvatar: '',
    isActiveNavigate: true,
    isActiveChanTrang: true,
    isActiveThoiGianRanh: false,
    isActiveTitle: true,
    isActiveCopyRight: true,
    isActiveFilter: true,
    isActiveListTutors: true,
    isActiveFilterChild1: false,
    conf: false,
    renderArticle: false,
    showChangePass: false,
    DataThoiGianRanh: [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ],
    TinhTuers: [],
    message: '',
    user: null,
    modalValue: null,
    client: null
};
const changeStatusShowChangePass = (state, action) => {
    state.showChangePass = action.payload;
}
const changeStatusClient = (state, action) => {
    state.client = action.payload;
}
const changeStatusRenderArticle = (state, action) => {
    state.renderArticle = action.payload;
}
const changeStatusConf = (state, action) => {
    state.conf = action.payload;
}
const changeStatusProm = (state, action) => {
    state.prom = action.payload;
}
const changeStatusModalValue = (state, action) => {
    state.modalValue = action.payload;
}
const changeStatusUser = (state, action) => {
    state.user = action.payload;
}
const changeStatusProfileWall = (state, action) => {
    state.isActiveProfileWall = action.payload;
}
const changeStatusProfileModal = (state, action) => {
    state.isActiveProfileModal = action.payload;
}
const changeStatusFailLogin = (state, action) => {
    state.isActiveFailLogin = action.payload;
}
const changeStatusLinkAvatar = (state, action) => {
    state.linkAvatar = action.payload;
}
const changeStatusRegisterForm = (state, action) => {
    state.isActiveRegisterForm = action.payload;
}
const changeStatusBodyFooter = (state, action) => {
    state.isActiveBodyFooter = action.payload;
}
const changeStatusNavigate = (state, action) => {
    state.isActiveNavigate = action.payload;
}
const changeStatusFilterChild1 = (state, action) => {
    state.isActiveFilterChild1 = action.payload;
}
const changeStatusMessage = (state, action) => {
    state.message = action.payload;
}
const changeStatusLoginForm = (state, action) => {
    state.isActiveLoginForm = action.payload;
}
const changeStatusLogin = (state, action) => {
    state.isActiveLogin = action.payload;
}
const changeStatusTinhTuers = (state, action) => {
    state.TinhTuers = action.payload;
}
const changeStatusDataThoiGianRanh = (state, action) => {
    if (action.payload.clear === true) {
        state.DataThoiGianRanh =
            [
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            ]
    }
    else if (action.payload.clear === false) {
        state.DataThoiGianRanh = [
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
        ]
    }
    else (state.DataThoiGianRanh)[action.payload.day][action.payload.hour] = !(state.DataThoiGianRanh)[action.payload.day][action.payload.hour];
}
const changeStatusListTutors = (state, action) => {
    state.isActiveListTutors = action.payload;
}
const changeStatusChanTrang = (state, action) => {
    state.isActiveChanTrang = action.payload;
}
const changeStatusThoiGianRanh = (state, action) => {
    state.isActiveThoiGianRanh = action.payload;
}
const changeStatusTitle = (state, action) => {
    state.isActiveTitle = action.payload;
}
const changeStatusCopyRight = (state, action) => {
    state.isActiveCopyRight = action.payload;
}
const changeStatusFilter = (state, action) => {
    state.isActiveFilter = action.payload;
}
const IsActiveReduce = createSlice({
    name: "isActive",
    initialState: intialisActive,
    reducers: {
        changeStatusChanTrang,
        changeStatusThoiGianRanh,
        changeStatusTitle,
        changeStatusCopyRight,
        changeStatusFilter,
        changeStatusListTutors,
        changeStatusDataThoiGianRanh,
        changeStatusTinhTuers,
        changeStatusLoginForm,
        changeStatusMessage,
        changeStatusFilterChild1,
        changeStatusLogin,
        changeStatusBodyFooter,
        changeStatusNavigate,
        changeStatusRegisterForm,
        changeStatusLinkAvatar,
        changeStatusFailLogin,
        changeStatusProfileModal,
        changeStatusProfileWall,
        changeStatusUser,
        changeStatusModalValue,
        changeStatusProm,
        changeStatusConf,
        changeStatusRenderArticle,
        changeStatusClient,
        changeStatusShowChangePass
    }
})

const IsActiveActions = IsActiveReduce.actions;
export { IsActiveReduce, IsActiveActions }