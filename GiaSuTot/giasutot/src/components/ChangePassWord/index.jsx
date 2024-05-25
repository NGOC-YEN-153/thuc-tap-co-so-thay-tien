import { useRef, useState } from 'react';
import './ChangePassWord.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchPost from '../../Fetch/fetchPost';
import { useDispatch } from 'react-redux';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { Button, Modal } from 'react-bootstrap';
const ChangePassWord = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handChange = async () => {
        try {
            const OLD = md5(ref1?.current?.value?.trim());
            const NEW = md5(ref2?.current?.value?.trim());
            const x = await fetchPost('http://localhost:8888/user/changePass', { OLD, NEW });
            if (x.message === 'success') {
                setMessage('Đổi mật khẩu thành công');
                setShow(true);
                dispatch(IsActiveActions.changeStatusProfileModal(false));
                dispatch(IsActiveActions.changeStatusBodyFooter(true));
                dispatch(IsActiveActions.changeStatusShowChangePass(false));
                setTimeout(() => navigate('/TrangChu'), 4000);
            }
            else {
                setMessage('Đổi mật khẩu thất bại');
                setShow(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleX = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(false));
        dispatch(IsActiveActions.changeStatusBodyFooter(true));
        dispatch(IsActiveActions.changeStatusShowChangePass(false));
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
            <form className="form-input">
                <div className="login-title">  Đổi mật khẩu</div>
                <div className='combo'>
                    <div className='s1 s'>
                        <label  >Mật khẩu cũ</label>
                        <input className='xx' type='text' maxLength='30' ref={ref1}></input>
                    </div>
                    <div className='s2 s '>
                        <label  >Mật khẩu mới</label>
                        <input className='xx' type='password' maxLength='30' ref={ref2}></input>
                    </div>
                    <div className='s3 s'>
                        <label >Nhập lại mật khẩu</label>
                        <input className='xx' type='password' maxLength='30' ref={ref3}></input>
                    </div>
                    <div className='s4 s' onClick={handChange}> Đổi mật khẩu</div>
                </div>
                <FontAwesomeIcon className="X" icon={faTimesCircle} onClick={handleX} />
            </form>
            <Modall />
        </>
    );
}
export default ChangePassWord; 