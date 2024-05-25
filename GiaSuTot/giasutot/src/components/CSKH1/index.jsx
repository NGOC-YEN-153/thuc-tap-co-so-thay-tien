import './CSKH1.css';
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
import { NavLink, json, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import fetchPost from '../../Fetch/fetchPost';
import fetchGet from '../../Fetch/fetchGet';
import { data } from 'jquery';
import { Button, Modal } from 'react-bootstrap';

const CSKH1 = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const [Customer, setCustomer] = useState([]);
    const [x, setX] = useState(false);
    const loc = useLocation();
    useEffect(() => {
        (
            async () => {
                const data = await fetchGet('http://localhost:8888/admin/getAllEmailSdt');
                setCustomer(data);
                window.scrollTo(0, 0);
            }
        )();
    }, [x, loc]);
    function makeDay(dateTimeString) {
        const date = new Date(dateTimeString);

        const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút
        const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Lấy năm

        return `${hours}:${minutes} ngày ${day}/${month}/${year}`;
    }
    const deletee = async (index) => {
        try {
            await fetchPost('http://localhost:8888/admin/deletee', { phoneNumberQueueId: Customer[index].phoneNumberQueueId });
            setMessage('Xóa thành công');
            setShow(true);
            setTimeout(() => {
                setX(!x);
            }, 3000);
        } catch (error) {
            console.error(error);
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
        <div>
            <div className='hea'>
                Danh sách khách hàng cần tư vấn
            </div>
            <table className="table table-striped sta">
                <thead>
                    <tr>
                        <th style={{ width: '1px', backgroundColor: '#0693e3', color: 'white' }} scope="col"></th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Email hoặc số điện thoại KH</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Thời gian gửi</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Gia sư khách muốn liên hệ</th>
                        <th style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} scope="col">Xóa?</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        Customer?.map((custom, index) => {
                            return (
                                <tr>
                                    <th style={{ textAlign: 'center' }} scope="row">{index + 1}</th>
                                    <th style={{ textAlign: 'center' }} >{custom.name}</th>
                                    <th style={{ textAlign: 'center' }}>{makeDay(custom.createdAt)}</th>
                                    {
                                        !custom?.userId ? < th style={{ textAlign: 'center' }}> Cần tư vấn</th> : <th style={{ textAlign: 'center' }}><NavLink to={`http://localhost:3000/ProfileWall?userId=${custom?.userId}&who=other`}>Xem</NavLink></th>
                                    }
                                    <th style={{ textAlign: 'center' }}><button onClick={() => deletee(index)} className='button-fix'>xóa</button></th>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div >
    );
}
// flex wrap tự độn xuoogns dòng
export default CSKH1;