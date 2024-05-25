import './Order.css';
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
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { NavLink, json, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import fetchGet from '../../Fetch/fetchGet';
import { makeColor } from '../../Award';

const Order = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const [info, setInfo] = useState([]);
    const loc = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        (
            async () => {
                let data = [];
                if (state?.user?.role === 1) data = await fetchGet(`http://localhost:8888/user/getAssessmentTableModeParent?userId=${state?.user?.userId}`);
                else if (state?.user?.role === 2) data = await fetchGet(`http://localhost:8888/user/getAssessmentTableModeTutor?userId=${state?.user?.userId}`);
                if (data?.length === 0) {
                    data = [{ tutorName: 'Không có thông tin ', parentName: 'Không có thông tin ', subject: 'Không có thông tin ', class: 'Không có thông tin', allStar: '0', status: false }];
                }
                setInfo(data);
                window.scrollTo(0, 0);
            }
        )();
    }, [state.user, loc]);
    const hand = (tutorId) => {
        navigate(`/ProfileWall?userId=${tutorId}&who=other`);
    }
    return (
        <div className='accessment das'>
            <div className='title-assessment ord  '>
                Đánh giá của phụ huynh
            </div>
            <table className="table table-striped ord ">
                <thead>
                    <tr>
                        <th style={{ width: '1px', backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> </th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> Phụ huynh </th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> Gia sư</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Môn</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Lớp</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Star</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Trạng thái</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col"> Xem đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {info?.map((value, index) => {
                        return (
                            <tr>
                                <td style={{ textAlign: 'center' }} >{index + 1}</td>
                                <td style={{ textAlign: 'center' }} >{value?.parentName}</td>
                                <td > <img onClick={() => hand(value?.tutorId)} className='small-avatarrr pe' style={{ position: 'relative', left: '20px' }} src={value?.linkAvatarTutor} alt="avt" />  <span style={{ color: makeColor(value?.star), position: 'relative', left: '35px' }}>{value?.tutorName}</span></td>
                                <td style={{ textAlign: 'center' }}>{value.subject}</td>
                                <td style={{ textAlign: 'center' }}>{value.class}</td>
                                <td style={{ textAlign: 'center' }}>{value.allStar} <FontAwesomeIcon icon={faStar} style={{ color: '#0693e3' }} /></td>
                                {
                                    value.status === true ? <td style={{ textAlign: 'center', color: '#28a745' }} >Đang theo học</td> : <td style={{ textAlign: 'center', color: '#d30000' }}>Đã kết thúc</td>
                                }
                                {
                                    info?.length >= 2 ? <td style={{ textAlign: 'center' }} ><NavLink to={`/detailAssessment?friendClassSubjectId=${value.friendClassSubjectId}&parentId=${value.parentId}&tutorId=${value.tutorId}&allStar=${value?.allStar}`}>Xem đánh giá</NavLink></td> :
                                        <td style={{ textAlign: 'center' }} ><NavLink to={`/detailAssessment?friendClassSubjectId=${value.friendClassSubjectId}&parentId=${value.parentId}&tutorId=${value.tutorId}&allStar=${value?.allStar}`}>Xem đánh giá</NavLink></td>
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
export default Order;