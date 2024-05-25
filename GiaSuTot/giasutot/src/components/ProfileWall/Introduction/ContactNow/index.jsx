import { useRef, useState } from 'react';
import './Contact.css';
import { Button, Modal, Form } from 'react-bootstrap';
import fetchPost from '../../../../Fetch/fetchPost';
import { deleteCookie, getCookie, setCookie } from '../../../Cookies';
import queryString from 'query-string';
const ContactNow = () => {
    const agent = useRef(null);
    const [onoff, setOnoff] = useState(false);
    const parameter = queryString.parse(window.location.search);
    const sub = async () => {
        const text = agent.current.value;
        setOnoff(!onoff);
        const data = await fetchPost('http://localhost:8888/guest/phonenumbercustom', { name: text, userId: parameter.userId });
        setShow(true);
        setMessage('Chúng tôi đã ghi nhận , sẽ liên hệ bạn sớm nhất ');
        let carts = getCookie('carts');
        if (!carts) setCookie('carts', parameter.userId);
        else {
            carts = carts + `,${parameter.userId}`;
            setCookie('carts', carts);
        }

    }
    const handleContact = () => {
        setOnoff(!onoff);
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
            <div className='contact-now'>
                <button className='button-fix hd' onClick={handleContact}> Liên hệ ngay</button>
                {
                    onoff ? <input className='contact-input hd' type="text" maxLength='55' ref={agent} placeholder='Để lại email ,số điện thoại và ghi chú nếu có ' />
                        : <></>
                }
                {
                    onoff ? <button className='button-fix hd ' onClick={sub}> Gửi </button>
                        : <></>
                }
            </div>
            <Modall />
        </>
    );
}
export default ContactNow;