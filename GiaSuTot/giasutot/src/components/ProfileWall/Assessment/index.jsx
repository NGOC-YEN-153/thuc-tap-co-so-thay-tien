import './Assessment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../../Reducers/IsActiveReducer';
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { NavLink, json, useLocation } from 'react-router-dom';
import fetchGet from '../../../Fetch/fetchGet';
import queryString from 'query-string';
import { LuEye } from "react-icons/lu";

function quyVeHangNghin(x) {
    if (!x) return 0.00;
    if (x < 1000) {
        return (x / 1000).toFixed(2);
    } else {
        return (parseInt(x.toString().slice(0, -3)) + parseInt(x.toString().slice(-3)) / 1000).toFixed(2);
    }
}
const Assessment = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const queryParams = queryString.parse(window.location.search);
    const loc = useLocation();
    const [info, setInfo] = useState([]);
    useEffect(() => {
        (
            async () => {
                let data = await fetchGet(`http://localhost:8888/guest/getAssessmentTable?userId=${queryParams.userId}`);
                // if (data?.length === 0) {
                //     data = [{ assesser: 'Không có thông tin ', subject: 'Không có thông tin ', class: 'Không có thông tin', allStar: '0', status: false }];
                // }
                setInfo(data);
                window.scrollTo(0, 0);
            }
        )();
    }, [loc]);
    if (info?.length === 0) return <></>;
    return (
        <div className='accessment da'>
            <div className='title-assessment'>
                Đánh giá của phụ huynh
            </div>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th style={{ width: '1px', backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> </th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col" > Phụ huynh</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Môn</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Lớp</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Sao tích lũy</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Trạng thái</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {info?.map((value, index) => {
                        return (
                            <tr>
                                <td style={{ textAlign: 'center' }}>#{index + 1}</td>
                                <td style={{ textAlign: 'center' }} >{value.parentName}</td>
                                <td style={{ textAlign: 'center' }}> {value.subject}</td>
                                <td style={{ textAlign: 'center' }}> {value.class}</td>
                                <td style={{ textAlign: 'center' }}> {quyVeHangNghin(value.allStar)} k  <FontAwesomeIcon icon={faStar} style={{ color: '#0693e3' }} /></td>
                                {
                                    value.status === true ? <td style={{ color: '#28a745', textAlign: 'center' }}>Đang theo học</td> : <td style={{ color: '#d30000', textAlign: 'center' }}>Đã kết thúc</td>
                                }
                                {
                                    1 ? <td style={{ textAlign: 'center' }} > <LuEye className='eye' /> <NavLink to={`/detailAssessment?friendClassSubjectId=${value.friendClassSubjectId}&parentId=${value.parentId}&tutorId=${queryParams.userId}&allStar=${value?.allStar}`}><span style={{ color: 'black' }}>Xem đánh giá</span></NavLink></td> : <td><span></span></td>
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
// flex wrap tự độn xuoogns dòng
export default Assessment;