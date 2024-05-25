import "./ListTutors.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";

import { PiShoppingCartSimple } from "react-icons/pi";
import { faStar, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchGet from "../../Fetch/fetchGet";
import { AiFillDollarCircle, AiTwotoneDollarCircle } from "react-icons/ai";

import { IsActiveActions } from "../../Reducers/IsActiveReducer";
import fetchPost from "../../Fetch/fetchPost";
import { makeColor } from "../../Award";
function ListTutors() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    function quyVeHangNghin(x) {
        if (!x) return 0;
        if (x < 1000) {
            return (x / 1000).toFixed(2);
        } else {
            return (parseInt(x.toString()?.slice(0, -3)) + parseInt(x.toString()?.slice(-3)) / 1000).toFixed(2);
        }
    }
    const [x, setX] = useState();
    const loc = useLocation();
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const data = await fetchGet('http://localhost:8888/guest/listtutor');
                dispatch(IsActiveActions.changeStatusTinhTuers(data));
                window.scrollTo(0, 0);
            } catch (error) {
                throw new Error(error);
            }
        }
        fetchAPI();
    }, [loc, x]);
    const hXoa = async (index) => {
        try {
            const tinhTuId = state?.TinhTuers[index].tinhTuId;
            await fetchPost('http://localhost:8888/user/deleteTinhTu', { tinhTuId: tinhTuId });
            setX(!x);
        } catch (error) {
            console.log(error);
        }
    }
    if (!state.isActiveListTutors) return <></>;
    return (
        <>
            <table className="table table-striped list-tutors">
                <thead style={{ backgroundColor: '#0693e3', color: 'white' }}>
                    <tr>
                        <th style={{ textAlign: 'center' }} scope="col"> </th>
                        <th style={{ textAlign: 'center' }} scope="col">Gia Sư</th>
                        <th style={{ textAlign: 'center' }} scope="col">Lớp</th>
                        <th style={{ textAlign: 'center' }} scope="col">Môn</th>
                        <th style={{ textAlign: 'center' }} scope="col">Khu vực</th>
                        <th style={{ textAlign: 'center' }} scope="col">Giá</th>
                        <th style={{ textAlign: 'center' }} scope="col"> Sao tích lũy</th>
                        <th style={{ textAlign: 'center', width: '100px' }} scope="col">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state?.TinhTuers?.map((TinhTu, index) => {
                            return (
                                <tr>
                                    <th scope="row">#{index + 1}</th>
                                    <td > <img src={TinhTu?.User.linkAvatar} alt='avt' style={{ width: '22px', height: '22px', borderRadius: '22px', marginRight: '15px' }}></img> <span style={{ color: makeColor(TinhTu?.User?.star), fontWeight: 'bold' }}>{TinhTu?.User?.name?.[0]}</span><span style={{ color: makeColor(TinhTu?.User?.star), fontWeight: 'bold' }}>{TinhTu.User?.name?.slice(1)}</span></td>
                                    <td style={{ maxWidth: '10px' }}>{TinhTu?.ClassSubject?.Class?.name}</td>
                                    <td style={{ maxWidth: '10px' }}>{TinhTu?.ClassSubject?.Subject?.name}</td>
                                    <td style={{}}> <IoLocationSharp style={{ transform: 'scale(1.2)' }} /> {TinhTu?.Xa?.name + ", " + TinhTu?.Xa?.Huyen?.name + ", " + TinhTu?.Xa?.Huyen?.Tinh?.name}</td>
                                    <td><AiFillDollarCircle style={{ opacity: '0.5', transform: 'scale(1.2)', marginRight: '10px' , color : '#fdd756' , backgroundColor : 'black' , borderRadius : '10px' }} />{TinhTu?.price} k /{TinhTu?.hour}h</td>
                                    <td style={{ textAlign: 'center' }}>{quyVeHangNghin(TinhTu?.User?.star)} k <FontAwesomeIcon icon={faStar} style={{ color: '#0693e3', marginLeft: '10px' }} /></td>
                                    <td>
                                        {
                                            TinhTu?.User.userId === state?.user?.userId ? <><button className="button-fix" onClick={() => hXoa(index)}>Xóa</button></> :
                                                <NavLink to={`/ProfileWall?userId=${TinhTu?.User?.userId}&who=other`}>Xem</NavLink>
                                        }
                                    </td>

                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}
export default ListTutors;
