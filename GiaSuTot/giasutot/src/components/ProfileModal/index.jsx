import './ProfileModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import { MdOutlineDataObject } from "react-icons/md";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { FaBluesky } from "react-icons/fa6";
import { FaAsterisk } from "react-icons/fa";
import { MdDataset } from "react-icons/md";

import { SiAzuredataexplorer } from "react-icons/si";

import { BsAndroid } from "react-icons/bs";

import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { PiHandshakeFill } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";

import { FaPlateWheat } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { IoKey } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions, IsActiveReduce } from '../../Reducers/IsActiveReducer';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteCookie, setCookie } from '../Cookies';
import { IoSearch } from 'react-icons/io5';
// đăng  xuất có cần xóa token ở cookies
const ProfileModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addConnect, setAddConnect] = useState(false);
    const [deleteConnect, setDeleteConnect] = useState(false);
    const state = useSelector(state => state.IsActiveReduce);
    const handlePrivateProfile = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate(`/ProfileWall?userId=${state?.user?.userId}&who=my`);
    }
    const handleLogOut = () => {
        deleteCookie('token');
        dispatch(IsActiveActions.changeStatusUser(null));
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/TrangChu');
    }
    const handleTuyenHocVien = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/tuyenHocVien');
    }
    const handleOrder = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate(`/order?userId=${state?.user?.userId}`);
    }
    const handleTuVan = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/CSKH1');
    }
    const handleGiaSuGuiLen = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/beforeCSKH2');
    }
    const handleConnect = async () => {
        setAddConnect(!addConnect);
        setDeleteConnect(!deleteConnect);
    }
    const addCon = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/connect?type=0');
    }
    const delCon = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/connect?type=1');
    }
    const hCustomManager = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        navigate('/customManage');
    }
    const changePass = async () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        dispatch(IsActiveActions.changeStatusBodyFooter(false));
        dispatch(IsActiveActions.changeStatusShowChangePass(true));
    }
    return (
        <>
            <div className='profile-modal' >
                {state?.user?.role === 2 ? <button className='button-fix but'> <FontAwesomeIcon icon={faUser} style={{ position: 'relative', left: '-17px' }} /> <span onClick={handlePrivateProfile}>Profile</span></button> : <></>}
                {state?.user?.role === 2 ? <button className='button-fix but'> <FontAwesomeIcon icon={faSignOut} style={{ position: 'relative', left: '-4px' }} /> <span onClick={handleTuyenHocVien} to={`/tuyenHocVien?userId=${state?.user?.userId}`} >Tuyển học viên </span></button> : <></>}
                {(state?.user?.role === 1 || state?.user?.role === 2) ? <button className='button-fix but'> <PiHandshakeFill style={{ position: 'relative', left: '-8px' }} /> <span onClick={handleOrder}>Đơn hàng</span></button> : <></>}
                {state?.user?.role === 3 ? <button className='button-fix but'> <BsAndroid style={{ position: 'relative', left: '-0px' }} /> <span onClick={handleTuVan}>Tư vấn khách hàng</span></button> : <></>}
                {state?.user?.role === 3 ? <button className='button-fix but' onClick={handleGiaSuGuiLen}> <SiAzuredataexplorer style={{ position: 'relative', left: '-4px' }} /> <span>Tuyển dụng </span></button> : <></>}
                {state?.user?.role === 3 ? <button className='button-fix but' onClick={handleConnect}> <MdDataset style={{ position: 'relative', left: '-7px' }} /> <span>Quản lí hợp đồng</span></button> : <></>}
                {(state?.user?.role === 3 && addConnect) ? <button className='button-fix but sma addsma' onClick={addCon}> + Thêm</button> : <></>}
                {(state?.user?.role === 3 && deleteConnect) ? <button className='button-fix but sma delsma' onClick={delCon}> - Xóa</button> : <></>}
                {state?.user?.role === 3 ? <button className='button-fix but' onClick={hCustomManager} > <FaAsterisk style={{ position: 'relative', left: '-2px' }} /> <span >Xét duyệt gia sư</span></button> : <></>}
                <button className='button-fix but' onClick={changePass} > <IoKey style={{ position: 'relative', left: '-2px' }} /> <span >Đổi mật khẩu</span></button>
                <button className='button-fix but' onClick={handleLogOut}> <FontAwesomeIcon style={{ position: 'relative', left: '-7px' }} icon={faSignOut} /> <span >Đăng xuất</span></button>
            </div>
        </>
    );

}
export default ProfileModal;