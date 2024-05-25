import './DetailAssessment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { PiTargetLight } from "react-icons/pi";

import { useState, useEffect } from "react";
import { FaRegHandPointRight } from "react-icons/fa6";
import { FaFaceGrinHearts } from "react-icons/fa6";


import { useSelector, useDispatch } from "react-redux";
import { FcClock } from "react-icons/fc";
import { IsActiveActions } from '../../../../Reducers/IsActiveReducer';
import { FaRegClock } from "react-icons/fa6";
import { FaBucket } from "react-icons/fa6";

import { MdOutlineOnlinePrediction } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { FaGift } from "react-icons/fa6";

import fetchGet from '../../../../Fetch/fetchGet';
import queryString from 'query-string';
import { FaFire } from "react-icons/fa";

import fetchPost from '../../../../Fetch/fetchPost';
import { Button, Modal } from 'react-bootstrap';
const makeDay = (Day) => {
    // Lấy ngày
    const day = Number(Day?.slice(5, 7));

    // Lấy tháng (lưu ý rằng tháng trong JavaScript được đếm từ 0)
    const month = Number(Day?.slice(8, 10));
    const year = Number(Day?.slice(0, 4));
    const x = new Date(Day);
    const time = x.getTime();
    return month + ' tháng ' + day + ' năm ' + year;
}
function quyVeHangNghin(x) {
    if (!x) return 0.00;
    if (x < 1000) {
        return (x / 1000).toFixed(2);
    } else {
        return (parseInt(x.toString().slice(0, -3)) + parseInt(x.toString().slice(-3)) / 1000).toFixed(2);
    }
}
const DetailAssessment = () => {
    const dispatch = useDispatch();
    const commentRef = useRef();
    const ratingRef = useRef();
    const state = useSelector(state => state.IsActiveReduce);
    const [assessments, setAssessments] = useState([]);
    const [tutor, setTutor] = useState(null);
    const [parent, setParent] = useState(null);
    const [isRelative, setIsRelative] = useState(false);
    const queryParams = queryString.parse(window.location.search);
    const [allStar , setAllStar] = useState(queryParams.allStar);
    const loc = useLocation();
    const [x, setX] = useState(false);
    useEffect(() => {
        (
            async () => {
                const tutorId = queryParams.tutorId;
                const parentId = queryParams.parentId;
                const friendClassSubjectId = queryParams.friendClassSubjectId;
                const isRelative = await fetchPost(`http://localhost:8888/user/checkRelative`, { tutorId: tutorId, parentId: state?.user?.userId, friendClassSubjectId: friendClassSubjectId });
                const tutor = await fetchGet(`http://localhost:8888/guest/getUserInfo?userId=${tutorId}`);
                const parent = await fetchGet(`http://localhost:8888/guest/getUserInfo?userId=${parentId}`);
                let data = [];
                if (isRelative === 0) data = await fetchGet(`http://localhost:8888/guest/detailAssessment?friendClassSubjectId=${friendClassSubjectId}`);
                else data = await fetchGet(`http://localhost:8888/user/commentModeOfficial?friendClassSubjectId=${friendClassSubjectId}`);
                setIsRelative(isRelative);
                setTutor(tutor[0]);
                setParent(parent[0]);
                setAssessments(data);
                window.scrollTo(0, 0);
            }
        )();
    }, [loc, isRelative, x]);
    // avatar gia sư và phụ huynh ( bổ sung sau)
    const colors = {
        'Legendary Grandmaster': {
            start: '#000000',
            end: '#ff0000'
        },
        'Grandmaster': '#ff0000',
        'Master': '#ff8c00',
        'Candidate Master': '#aa00aa',
        'Expert': '#aa00aa',
        'Specialist': '#03a89e',
        'Pupil': '#008000',
        'Newbie': '#8080a1'
    }
    const makeColor = (star, number) => {
        if (star === undefined || star === 'undefined') return;
        if (number === 1) {
            if (star >= 10000000) return (colors['Legendary Grandmaster']).start;
            else if (star >= 1000000) return colors['Grandmaster'];
            else if (star >= 6) return colors['Master'];
            else if (star >= 5) return colors['Candidate Master'];
            else if (star >= 4) return colors['Expert'];
            else if (star >= 3) return colors['Specialist'];
            else if (star >= 2) return colors['Pupil'];
            else if (star >= 1) return colors['Newbie'];

        }
        else {
            if (star >= 10000000) return (colors['Legendary Grandmaster']).end;
            else if (star >= 1000000) return colors['Grandmaster'];
            else if (star >= 6) return colors['Master'];
            else if (star >= 5) return colors['Candidate Master'];
            else if (star >= 4) return colors['Expert'];
            else if (star >= 3) return colors['Specialist'];
            else if (star >= 2) return colors['Pupil'];
            else if (star >= 1) return colors['Newbie'];
        }
    }
    const handleRating = async () => {
        const star = parseInt(ratingRef.current.value);
        const comment = commentRef.current.value;
        const friendClassSubjectId = queryParams.friendClassSubjectId;
        const tutorId = queryParams.tutorId;
        await fetchPost('http://localhost:8888/user/createCommentAssessment', { friendClassSubjectId, comment, star, tutorId });
        setTimeout(() => {
            setX(!x);
            setAllStar(star);
        }, 1000);
        setMessage('Đánh giá thành công');
        setShow(true);
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
    return (
        <>
            <div className='detail-assessment'>
                <div className='first-assessment'>
                    <div className='element-assessment'> <PiTargetLight style={{ color: 'red', transform: 'scale(1.8)', marginRight: '10px' }} /> Đánh giá chât lượng gia sư   <span style={{ color: makeColor(tutor?.star, 1), fontWeight: 'bold' }}>{tutor?.name?.[0]}</span><span style={{ color: makeColor(tutor?.star, 2), fontWeight: 'bold' }}>{tutor?.name?.slice(1)}</span> </div>
                    <div className='element-assessment'> <FcClock style={{ transform: 'scale(1.5)', marginRight: '10px' }} />Ngày bắt đầu : <span style={{ fontWeight: 'bold' }}>{makeDay(assessments?.startTime)}</span></div>
                    <div className='element-assessment'><FaFaceGrinHearts style={{ transform: 'scale(1.8)', marginRight: '10px', opacity: '0.7', backgroundColor: '#d30000', color: 'white', borderRadius: '13px' }} /> Tổng số sao nhận được hiện tại : <span style={{ fontWeight: 'bold' }}>{allStar}</span>   <FontAwesomeIcon style={{ color: '#0693e3', marginLeft: '4px' }} icon={faStar} /></div>
                    {
                        !assessments?.deletedAt ? <div className='element-assessment' style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}><FaFire /> Đang diễn ra...</div> : <div className='element-assessment'> <span style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Đã kết thúc!</span></div>
                    }
                </div>
                {
                    assessments?.Assessments?.length === 0 ?
                        <>
                            <div className='khong-co-bai-viet-nao'>Chưa có đánh giá !</div>
                            {
                                isRelative === 2 ? <>
                                    <div className='dg'>Đánh giá ngay</div>
                                    <textarea className='commentt' ref={commentRef} ></textarea>
                                    <FaGift className='giftt' /> <input className='sao' type="text" ref={ratingRef} />
                                    <FontAwesomeIcon style={{ color: '#0693e3', position: 'relative', left: '350px', bottom: '85px' }} icon={faStar} />
                                    <button className='subbbb' onClick={handleRating}>Đánh giá </button>
                                </> : <></>
                            }
                        </>
                        :
                        <div className='assessments'>
                            {
                                assessments?.Assessments?.map((assessment) => {
                                    return (
                                        <>
                                            <div className='assessment'>
                                                <img className='avatar-assesser' src={parent?.linkAvatar} alt='avatar'></img>
                                                <div className='right-assessment'>
                                                    <span className='name-assesser'>{parent?.userName}</span>
                                                    <span>{makeDay(assessment?.time)}</span>


                                                    <div style={{ marginTop: '10px', marginBottom: '7px' }}> Phản hồi của phụ huynh : </div>
                                                    <div style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '10px' }}> - {assessment?.content}</div>
                                                    <div className='star-assessment'>
                                                        <FontAwesomeIcon style={{ color: '#0693e3', marginRight: '10px' }} icon={faStar} />
                                                        <span> <span> {assessment?.star} /  100  </span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );

                                })
                            }
                            {
                                isRelative === 2 ? <>
                                    <div className='dg'>Đánh giá ngay</div>
                                    <textarea className='commentt' ref={commentRef} ></textarea>
                                    <FaGift className='giftt' /> <input className='sao' type="text" ref={ratingRef} />
                                    <FontAwesomeIcon style={{ color: '#0693e3', position: 'relative', left: '350px', bottom: '85px' }} icon={faStar} />
                                    <button className='subbbb' onClick={handleRating}>Đánh giá</button>
                                </>
                                    : <></>
                            }
                        </div>
                }
            </div>
            <Modall />
        </>
    );
}
// flex wrap tự độn xuoogns dòng
export default DetailAssessment;