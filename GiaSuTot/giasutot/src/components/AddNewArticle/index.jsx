import { useEffect, useRef, useState } from 'react';
import './AddNewArticle.css';
import { Button, Modal, Form } from 'react-bootstrap';
import fetchPost from '../../Fetch/fetchPost';
import axios from 'axios';
import { IoAdd } from "react-icons/io5";

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AddNewArticle = () => {
    const navigate = useNavigate();
    const pri = useRef(null);
    const pub = useRef(null);
    const fil = useRef(null);
    const text = useRef(null);
    const state = useSelector(state => state.IsActiveReduce);
    const location = useLocation();
    useEffect(() => {
        (
            async () => {
                window.scrollTo(0, 0);
            }
        )();
    }, [location]);
    let publicMode = true;
    const handlePri = () => {
        pri.current.style.backgroundColor = '#28a745';
        pri.current.style.color = 'white';

        pub.current.style.backgroundColor = 'white';
        pub.current.style.color = 'black';

        publicMode = false;
    }
    const handlePub = () => {
        pub.current.style.backgroundColor = '#28a745';
        pub.current.style.color = 'white';

        pri.current.style.backgroundColor = 'white';
        pri.current.style.color = 'black';

        publicMode = true;
    }
    const handleSubmit = async () => {
        const files = fil.current.files;
        const texts = text.current.value;
        const formData = new FormData();
        formData.append('texts', texts);
        formData.append('publicMode', publicMode);

        const res = await fetch('http://localhost:8888/user/createPost', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Gửi cookies cùng với yêu cầu
        });
        const data = await res.json();
        const string = JSON.stringify(data);
        const ans = JSON.parse(string);
        const articleId = ans.articleId;
        formData.append('files', files);

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('files', files[i]);
            formData.append('articleId', articleId);
            await fetch('http://localhost:8888/user/createMedia', {
                method: 'POST',
                body: formData,
                credentials: 'include' // Gửi cookies cùng với yêu cầu
            });
        };
        setTimeout(() => {
            setShow(true);
            setTimeout(() => navigate(`/ProfileWall?userId=${state?.user?.userId}&who=my`), 3000);
        });
    }
    const [show, setShow] = useState(false);
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
                        Thêm bài viết thành công , vào trang cá nhân khám phá ngay nào
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
            <div className='add-article'>
                <div className='title-add-article'> <IoAdd />Thêm bài viết</div>
                <div className='title-articless'>
                    <textarea className='content-add-article' ref={text} ></textarea>
                </div>
                <div>
                    <input className='chose-file' type='file' multiple ref={fil}></input>

                </div>
                <div>
                    <button className='butt' ref={pri} onClick={handlePri}>Chỉ mình tôi</button>
                    <button className='button-fix' ref={pub} onClick={handlePub}>Công khai(mặc định)</button>
                </div>
                <div>
                    <button className=' button-fix  submit-new-article' onClick={handleSubmit}> Tạo bài viết</button>

                </div>
            </div>
            <Modall />
        </>
    );
}
export default AddNewArticle;