import './Connect.css';
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
import { IoMdAdd } from "react-icons/io";

import { FaBriefcase } from "react-icons/fa";
import { NavLink, json, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import fetchPost from '../../Fetch/fetchPost';
import { MdDeleteSweep } from "react-icons/md";
import fetchGet from '../../Fetch/fetchGet';
import { IoAdd } from 'react-icons/io5';
import { Button, Modal } from 'react-bootstrap';
const Connect = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const navigate = useNavigate();
    const [x, setX] = useState(false);
    const [showList, setShowList] = useState(false);
    const [connectList, setConnectList] = useState([]);
    const refgs1 = useRef(null);
    const refph1 = useRef(null);
    const refgs2 = useRef(null);
    const refph2 = useRef(null);
    const refMon = useRef(null);
    const refLop = useRef(null);
    const [showImage1, setShowImage1] = useState(false);
    const [showImage2, setShowImage2] = useState(false);
    const [showImage3, setShowImage3] = useState(false);
    const [showImage4, setShowImage4] = useState(false); // ten la image nhung la user , ngai sua
    const parameter = queryString.parse(window.location.search);
    const loc = useLocation();
    useEffect(() => {
        (
            async () => {
                window.scrollTo(0, 0);
            }
        )();
    }, [x, setShowList, loc]);
    function makeDay(dateTimeString) {
        const date = new Date(dateTimeString);

        const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút
        const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Lấy năm

        return `${hours}:${minutes} ngày ${day}/${month}/${year}`;
    }
    const ava = (userId) => {
        navigate(`/ProfileWall?userId=${userId}&who=other`);
    }
    const addConnect = async () => {
        try {
            const kh = refph1.current.value?.trim();
            const gs = refgs1.current.value?.trim();
            const mon = refMon.current.value?.trim();
            const lop = refLop.current.value?.trim();
            const ok = await fetchPost(`http://localhost:8888/admin/addConnect`, { gsUsername: gs, phUsername: kh, mon, lop });
            setMessage('Thêm kết nối thành công');
            setShow(true);
            setTimeout(() => {
                navigate('/TrangChu');
            }, 4000);
        } catch (error) {
            console.log(error);
            setMessage('Thêm hợp đồng thành công');
            setShow(true);
        }
    }
    const deleteConnect = async (id) => {
        try {
            const friendClassSubjectId = connectList[id]?.friendClassSubjectId;
            await fetchPost(`http://localhost:8888/admin/deleteConnect`, { friendClassSubjectId: friendClassSubjectId });
            const tmp = connectList[id];
            setConnectList([...connectList?.slice(0, id), ...connectList?.slice(id + 1)]);
            setMessage('Xóa hợp đồng thành công');
            setShow(true);
        } catch (error) {
            console.log(error);
        }
    }
    const searchConnect = async () => {
        const kh = refph2.current.value?.trim();
        const gs = refgs2.current.value?.trim();
        const data = await fetchGet(`http://localhost:8888/admin/getConnect?ph=${kh}&gs=${gs}`);
        setConnectList(data);
        setShowList(!showList);
    }
    const find1 = async () => {
        try {
            const data = await fetchGet(`http://localhost:8888/admin/checkUser?userName=${refph1?.current?.value?.trim()}`);
            if (!data.message) {
                setShowImage1(data);
            }
            else setShowImage1(false);
        } catch (error) {

        }
    }
    const find2 = async () => {
        try {
            const data = await fetchGet(`http://localhost:8888/admin/checkUser?userName=${refgs1?.current?.value?.trim()}`);
            if (!data.message) {
                setShowImage2(data);
            }
            else setShowImage2(false);
        } catch (error) {

        }
    }
    const find3 = async () => {
        try {
            const data = await fetchGet(`http://localhost:8888/admin/checkUser?userName=${refph2?.current?.value?.trim()}`);
            if (!data.message) {
                setShowImage3(data);
            }
            else setShowImage3(false);
        } catch (error) {

        }
    }
    const find4 = async () => {
        try {
            const data = await fetchGet(`http://localhost:8888/admin/checkUser?userName=${refgs2?.current?.value?.trim()}`);
            if (!data.message) {
                setShowImage4(data);
            }
            else setShowImage4(false);
        } catch (error) {

        }
    }
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false);
    const Modall = () => {
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {message}
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="success" onClick={handleShow}>Đồng ý</Button>
                        <Button variant="danger" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    if (state?.user?.role !== 3) return <></>;
    return (
        <>
            <div className='connect'>
                <div className='title posti'>
                    {parameter.type === '0' ? <span style={{ backgroundColor: '#0693e3', color: 'white', borderRadius: '10px', fontSize: '26px' }}> < IoMdAdd style={{ marginLeft: '15px' }} /> <span style={{ marginRight: '25px' }}>Thêm hợp đồng</span></span> : <span style={{ backgroundColor: '#0693e3', color: 'white', borderRadius: '10px', fontSize: '26px' }}> < MdDeleteSweep style={{ marginLeft: '15px' }} /> <span style={{ marginRight: '25px' }}> Xóa hợp đồng</span></span>}
                </div>
                <div className='body-connect'>
                    {
                        parameter.type === '0' ? <div className='add-connect'>
                            <div><label>Tài khoản phụ huynh</label> <input type="text" ref={refph1} onChange={() => find1()} /> {showImage1 ? <img className='small-avatarrr' src={showImage1?.linkAvatar} alt="avt" onClick={() => ava(showImage1?.userId)} /> : <></>}</div>
                            <div><label>Tài khoản gia sư</label> <input type="text" ref={refgs1} onChange={() => find2()} /> {showImage2 ? <img className='small-avatarrr' src={showImage2?.linkAvatar} alt="avt" onClick={() => ava(showImage2?.userId)} /> : <></>}</div>
                            <div> <label htmlFor="">Môn</label><input type="text" ref={refMon} /></div>
                            <div> <label htmlFor="">Lớp</label><input type="text" ref={refLop} /></div>
                            <button className='button-fix sw ' onClick={addConnect}>Thêm </button>
                        </div> :
                            <div className='delete-connect'>
                                <div className='d1'><label className='lb1'>Tài khoản phụ huynh</label> <input type="text" ref={refph2} onChange={() => find3()} /> {showImage3 ? <img className='small-avatarrr' src={showImage3?.linkAvatar} alt="avt" onClick={() => ava(showImage3?.userId)} /> : <></>}</div>
                                <div className='d2'><label className='lb2'>Tài khoản gia sư</label> <input type="text" ref={refgs2} onChange={() => find4()} /> {showImage4 ? <img className='small-avatarrr' src={showImage4?.linkAvatar} alt="avt" onClick={() => ava(showImage4?.userId)} /> : <></>}</div>
                                <button className='button-fix sear' onClick={searchConnect}> Tìm</button>
                                {
                                    showList ? <table className="table table-striped del-table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Gia sư</th>
                                                <th scope="col">Phụ huynh</th>
                                                <th scope="col">Môn</th>
                                                <th scope="col">Lớp</th>
                                                <th scope="col">Thời gian tạo kết nối</th>
                                                <th scope="col">Tùy chọn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                connectList?.length === 0 ?
                                                    <tr>
                                                        <td >#{0}</td>
                                                        <td >Không có thông tin </td>
                                                        <td >Không có thônsg tin </td>
                                                        <td >Không có thông tin </td>
                                                        <td >Không có thông tin </td>
                                                        <td >Không có thông tin </td>
                                                        <td >Không có thông tin </td>

                                                    </tr>
                                                    :
                                                    connectList?.map((connectt, index) => {
                                                        return (
                                                            <tr>
                                                                <td >#{index}</td>
                                                                <td> <img onClick={() => ava(connectt?.tutor?.userId)} className='small-avatarr' src={`${connectt?.tutor?.linkAvatar}`} alt="avt" /></td>
                                                                <td> <img onClick={() => ava(connectt?.parent?.userId)} className='small-avatarr' src={connectt?.parent?.linkAvatar} alt="avt" /></td>
                                                                <td> {connectt?.mon}</td>
                                                                <td> {connectt?.lop}</td>
                                                                <td >{makeDay(connectt?.createdAt)}</td>
                                                                <td> <button className='button-fix' onClick={() => deleteConnect(index)}>xóa</button></td>

                                                            </tr>
                                                        );
                                                    })
                                            }
                                        </tbody>
                                    </table> : <></>
                                }
                            </div>
                    }
                </div>
            </div>
            <Modall />
        </>
    );
}
// flex wrap tự độn xuoogns dòng
export default Connect;