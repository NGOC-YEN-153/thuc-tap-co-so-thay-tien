import './Introduction.css';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import queryString from "query-string";
import { FaHandshake } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { MdImageAspectRatio } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { PiUserThin } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidChevronsUp } from "react-icons/bi";
import { FaWrench } from "react-icons/fa";
import { FaRegChessQueen } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";

import { FaRegClock } from "react-icons/fa6";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';
import fetchGet from '../../../Fetch/fetchGet';
import fetchPost from '../../../Fetch/fetchPost';
import ContactNow from './ContactNow';
import { IsActiveActions } from '../../../Reducers/IsActiveReducer';
import { makeAward, makeColor } from '../../../Award';
import { Button, Modal, Form } from 'react-bootstrap';
const makeDay = (Day) => {
    // Lấy ngày
    const month = Number(Day?.slice(5, 7));

    // Lấy tháng (lưu ý rằng tháng trong JavaScript được đếm từ 0)
    const day = Number(Day?.slice(8, 10));

    const year = Number(Day?.slice(0, 4));
    const x = new Date(Day);
    const time = x.getTime();
    console.log(time)
    return day + ' tháng ' + month + ' năm ' + year;
}
const makeDay2 = (Day) => {
    const time = new Date().getTime() - Date.parse(Day);
    const minute = Math.floor(time / 1000 / 60);
    if (minute < 60) return `${minute} phút trước`;
    else if (minute < 60 * 24) return `${Math.floor(minute / 60)} giờ trước`;
    else return `${Math.floor(minute / 60 / 24)} ngày trước`;
}
const calcBuff = (buff) => {
    if (buff < 5) return 0;
    if (buff >= 5) return 10;
    else if (buff >= 10) return 20;
    else if (buff >= 20) return 30;
    else if (buff >= 30) return 50;
}
const Introduction = () => {
    const dispatch = useDispatch();
    const file = useRef(null);
    const state = useSelector(state => state.IsActiveReduce);
    const [danhHieu, setDanhHieu] = useState(0);
    const [checked, setChecked] = useState(false);
    const [rightPens, setRightPens] = useState([false, false, false, false, false, false, false, false]);
    const [client, setClient] = useState(null);
    const parameter = queryString.parse(window.location.search);
    const [x, setX] = useState(false);
    const [ce, setCe] = useState(false);//ce = censore
    const [indexState, setIndexState] = useState(0);
    const [typeState, setTypeState] = useState(0);
    const [showTextInput, setShowTextInput] = useState(false);
    const [contentState, setContentState] = useState('');
    const [show, setShow] = useState(false);
    const refI = useRef(null);
    const handlePen = (index) => {
        try {
            setRightPens(state => {
                state[index] = !state[index];
                state = [...state];
                return state;
            });
        } catch (error) {
            console.log(error);
        }
    }
    const preHienThi = (index) => {
        setContentState('Xác nhận thay đổi ');
        setShowTextInput(false);
        setShow(true);
        setIndexState(index);
        setTypeState(1);

    }
    const preAn = (index) => {
        setContentState('Xác nhận thay đổi ');
        setShowTextInput(false);
        setShow(true);
        setIndexState(index);
        setTypeState(2);

    }
    const preSua = (index) => {
        setContentState('Nhập thông tin mới ');
        setShowTextInput(true);
        setShow(true);
        setIndexState(index);
        setTypeState(3);

    }
    const handleHienThi = async (index) => {
        if (index === 1) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleCareer: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }
        else if (index === 2) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleExp: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 3) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleJoin: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 4) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleLastVisit: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 5) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleCountHocVien: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);

                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 6) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleChainGood: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }
        else if (index === 7) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleMota: true });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleAn = async (index) => {
        if (index === 1) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleCareer: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);

                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }
        else if (index === 2) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleExp: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);

                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 3) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleJoin: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 4) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleLastVisit: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 5) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleCountHocVien: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

        else if (index === 6) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleChainGood: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }
        else if (index === 7) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { visibleMota: false });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                        }
                        setIndexState(-1);
                    }
                )();
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleSua = async (index, TextInput) => {
        if (index === 0) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { name: TextInput });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                            setCe(true);
                        }
                        setIndexState(-1);
                        setShowTextInput(false);
                        setShowTextInput(false);
                    }
                )();
            } catch (error) {

            }
        }
        else if (index === 1) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { career: TextInput, typee: 'fix' });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                            setCe(true);
                        }
                        setIndexState(-1);
                        setShowTextInput(false);
                    }
                )();
            }
            catch (error) {
                console.log(error);
            }
        }
        else if (index === 2) {
            try {
                (
                    async () => {
                        const exp = Number(TextInput.trim());
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { exp: exp, typee: 'fix' });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                            setCe(true);
                        }
                        setIndexState(-1);
                        setShowTextInput(false);
                    }
                )();
            }
            catch (error) {
                console.log(error);
            }
        }
        else if (index === 7) {
            try {
                (
                    async () => {
                        const err = await fetchPost('http://localhost:8888/user/updateUser', { mota: TextInput, typee: 'fix' });
                        if (err instanceof Error) setContentState('Cập nhật không thành công');
                        else {
                            setContentState('Cập nhật thành công');
                            setX(!x);
                            setCe(true);
                        }
                        setIndexState(-1);
                        setShowTextInput(false);
                    }
                )();
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    function quyVeHangNghin(x) {
        if (!x) return 0.00;
        if (x < 1000) {
            return (x / 1000).toFixed(2);
        } else {
            return (parseInt(x.toString().slice(0, -3)) + parseInt(x.toString().slice(-3)) / 1000).toFixed(2);
        }
    }

    const handleSubmit = async () => {
        const phai = file.current.files[0];
        const formData = new FormData();
        formData.append('files', phai);
        setIndexState(-1);
        setContentState('Thay đổi diện mạo thành công');
        setShow(true);
        setTimeout(() => setX(!x), 3000);
        const err = await fetch('http://localhost:8888/user/createAvatar', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Gửi cookies cùng với yêu cầu
        });
    }

    const loc = useLocation();
    useEffect(() => {
        (
            async () => {
                // const x = await fetchGet('http://localhost:8888/user/getInfoCookies');
                // dispatch(IsActiveActions.changeStatusUser(x));
                try {
                    let data = [];
                    if (parameter.who === 'my') data = await fetchGet(`http://localhost:8888/user/getIntroductionInfomation?userId=${parameter.userId}`);
                    else if (parameter.who === 'other') data = await fetchGet(`http://localhost:8888/guest/getIntroductionInfomation?userId=${parameter.userId}`);
                    setClient(data);
                    if (!state?.user?.profileCensore && parameter.who === 'my') setCe(true);
                    setDanhHieu(makeAward(data?.star));
                    window.scrollTo(0, 0);
                } catch (error) {

                }
            }
        )();
    }, [x, ce, loc]);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        if (indexState === -1) {
            setShow(false);
            return;
        }
        if (typeState === 1) await handleHienThi(indexState);
        else if (typeState === 2) await handleAn(indexState);
        else if (typeState === 3) await handleSua(indexState, refI.current.value);
    }
    const Modall = (props) => {
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {props.content}
                    </Modal.Body>

                    {
                        showTextInput ? <Form.Control type="text" placeholder="Điền thông tin tại đây" ref={refI} /> : <></>
                    }
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
    return (
        <>
            <div className='head-of-page'>
                <div className='head-of-page-1'>
                    <div className='name-info'>
                        <PiUserThin style={{ marginRight: '10px' }} />
                        <span className='namename' style={{ color: makeColor(client?.star), fontWeight: 'bold' }}>{client?.name?.[0] || 'PTIT'}</span>
                        <span className='namename' style={{ color: makeColor(client?.star), fontWeight: 'bold' }}>{client?.name?.slice(1)}</span>
                        {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => preSua(0)} /> : <></>}
                        <span style={{ fontWeight: 'bold', color: makeColor(client?.star) }}> &lt; Mã gia sư : GS{String(client?.userId).padStart(3, '0')} &gt; </span>
                    </div>
                    <div className='frame-freefire' > <img className='freefire-image' src={client?.rankImage} alt='danh-hieu' ></img> </div>
                    <div style={{ color: makeColor(client?.star) }} className='danh-hieu'> <FaRegChessQueen style={{ marginRight: '10px', color: '#c7a92b' }} /> <spam style={{ position: 'relative', top: '2px' }}>{danhHieu}</spam></div>
                    <div className='rating'><FontAwesomeIcon icon={faStar} style={{ marginRight: '10px', color: '#0693e3' }} /> Rating : {quyVeHangNghin(client?.star)} k </div>
                    {parameter?.who === 'my' ? <div className='buff' style={{ color: '#28a745', fontSize: '15px', fontWeight: '500' }}>
                        <BiSolidChevronsUp className='bi' /> {calcBuff(client?.buff)} %   (thưởng chuỗi)
                    </div> : <></>}
                </div>
                <div className='frame-avatar' >
                    <img className='big-avatar' src={client?.linkAvatar} alt='avatar' ></img>
                    {(ce) ? <div className='ba'><FaBan className='ban' /> <span style={{ marginLeft: '10px ', color: '#d30000' }}>Đang kiểm duyệt</span></div>
                        : <></>}
                </div>
                {
                    parameter.who === 'my' ? <>
                        <input type="file" name='files' ref={file} id='file1' />
                        <button id='sub1' className='button-fix' onClick={handleSubmit}> Thay đổi </button>
                    </> : <></>
                }
                <div className='head-of-page-2' >

                    {
                        ((parameter.who === 'my') || client?.visibleCareer) ? <div className='career-profile'>
                            <FaBriefcase style={{ marginLeft: '10px', marginRight: '10px' }} />
                            Công việc hiện tại :
                            <span style={{ fontWeight: 'bolder', fontSize: '16px' }}> {client?.career} </span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(1)} /> : <></>}
                            {
                                rightPens[1] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleCareer ? '#28a745' : '#dedede') }} onClick={() => preHienThi(1)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleCareer ? '#dedede' : '#28a745') }} onClick={() => preAn(1)}> <AiOutlineEyeInvisible /> ẩn</button>
                                        <button className='button-fix' onClick={() => preSua(1)}><FaCheck />sửa </button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }

                    {
                        ((parameter.who === 'my') || client?.visibleExp) ? <div className='exp-profile'>  <FaBookReader style={{ marginLeft: '10px', marginRight: '10px' }} />
                            Kinh nghiệm :
                            <span style={{ fontWeight: 'bolder', fontSize: '16px' }}> {client?.exp} năm </span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(2)} /> : <></>}
                            {
                                rightPens[2] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleExp ? '#28a745' : '#dedede') }} onClick={() => preHienThi(2)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleExp ? '#dedede' : '#28a745') }} onClick={() => preAn(2)}> <AiOutlineEyeInvisible /> ẩn</button>
                                        <button className='button-fix' onClick={() => preSua(2)}><FaCheck />sửa </button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }


                    {
                        ((parameter.who === 'my') || client?.visibleJoin) ? <div className='join-giasutot' > <FaRegClock style={{ marginLeft: '10px', marginRight: '10px' }} /> Tham gia : <span style={{ fontWeight: 'bolder', fontSize: '16px' }}>{makeDay(client?.createdAt)}</span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(3)} /> : <></>}
                            {
                                rightPens[3] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleJoin ? '#28a745' : '#dedede') }} onClick={() => preHienThi(3)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleJoin ? '#dedede' : '#28a745') }} onClick={() => preAn(3)}> <AiOutlineEyeInvisible /> ẩn</button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }


                    {
                        ((parameter.who === 'my') || client?.visibleLastVisit) ? <div className='online-profile'> <MdOutlineOnlinePrediction style={{ marginLeft: '10px', marginRight: '10px' }} /> Last visit :
                            <span style={{ fontWeight: 'bolder', fontSize: '16px' }}> {makeDay2(client?.lastOnline)} </span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(4)} /> : <></>}

                            {
                                rightPens[4] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleLastVisit ? '#28a745' : '#dedede') }} onClick={() => preHienThi(4)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleLastVisit ? '#dedede' : '#28a745') }} onClick={() => preAn(4)}> <AiOutlineEyeInvisible /> ẩn</button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }


                    {
                        ((parameter.who === 'my') || client?.visibleCountHocVien) ? <div className='count-client' >
                            <FaHandshake style={{ marginLeft: '10px', marginRight: '10px' }} />
                            Số lượt học viên : <span style={{ fontWeight: 'bolder', fontSize: '16px' }} >{client?.countHocVien || 0} lượt</span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(5)} /> : <></>}

                            {
                                rightPens[5] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleCountHocVien ? '#28a745' : '#dedede') }} onClick={() => preHienThi(5)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleCountHocVien ? '#dedede' : '#28a745') }} onClick={() => preAn(5)}>  <AiOutlineEyeInvisible /> ẩn</button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }


                    {
                        ((parameter.who === 'my') || client?.visibleChainGood) ? <div className='good-assessment-chain'>
                            <FaChartLine style={{ marginLeft: '10px', marginRight: '10px' }} />
                            Chuỗi đánh giá tốt dài nhất <span style={{ fontWeight: 'bolder', fontSize: '16px' }}> :  chuỗi {client?.longestGoodAssessmentChain}</span>
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(6)} /> : <></>}
                            {
                                rightPens[6] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleChainGood ? '#28a745' : '#dedede') }} onClick={() => preHienThi(6)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleChainGood ? '#dedede' : '#28a745') }} onClick={() => preAn(6)}> <AiOutlineEyeInvisible /> ẩn</button>
                                    </span> : <></>
                            }
                        </div> : <></>
                    }

                    {
                        ((parameter.who === 'my') || client?.visibleMota) ? <div>
                            <span className='classes'>
                                <MdImageAspectRatio style={{ marginLeft: '10px', marginRight: '10px' }} />
                                Nhận gia sư các môn : </span>
                            <span className='mota' style={{ fontWeight: 'bolder', fontSize: '16px' }}> {client?.mota}</span >
                            {parameter.who === 'my' ? <FaWrench className='pen-fix' onClick={() => handlePen(7)} /> : <></>}
                            {
                                rightPens[7] ?
                                    <span><button className='button-fix' style={{ backgroundColor: (client?.visibleMota ? '#28a745' : '#dedede') }} onClick={() => preHienThi(7)} ><AiOutlineEye />hiển thị</button>
                                        <button className='button-fix' style={{ backgroundColor: (client?.visibleMota ? '#dedede' : '#28a745') }} onClick={() => preAn(7)}> <AiOutlineEyeInvisible /> ẩn</button>
                                        <button className='button-fix' onClick={() => preSua(7)}><FaCheck />sửa</button>
                                    </span> : <></>
                            }
                            {
                                (parameter.who === 'other' && (!state?.user?.role || state?.user?.role === 1)) ? <ContactNow /> : <></>
                            }
                        </div> : <></>
                    }
                </div>
            </div>
            <Modall title='Thông báo' content={contentState} />
        </>

    );
}

export default Introduction;
