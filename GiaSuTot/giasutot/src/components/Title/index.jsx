import './Title.css';
import { useSelector, useDispatch } from "react-redux";
import { PiShoppingCartSimple } from "react-icons/pi";
import { getCookie } from "../Cookies";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import fetchGet from "../../Fetch/fetchGet";
import { IsActiveActions } from "../../Reducers/IsActiveReducer";
import { useRef, useState } from "react";
import { ref } from "firebase/database";
import { Button, Modal } from "react-bootstrap";

function Title() {
    const state = useSelector(state => state.IsActiveReduce);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    // getTinhTuerByIdHost
    const ref3 = useRef(null);
    const reff = useRef(null);
    const dispatch = useDispatch();
    const handleCart = async () => {
        if (!state.user | state?.user?.role === 1) {
            const a = getCookie('carts');
            let userIds = 1;
            if (!a) {
                setMessage('Bạn chưa có đơn hàng nào');
                setShow(true);
                return;
            }
            else userIds = a.split(/\s*,\s*/);
            reff.current.innerText = 'Danh sách gia sư bạn quan tâm';
            const data = await fetchGet(`http://localhost:8888/guest/getAllTinhtuersById?userIds=[${userIds}]`);
            dispatch(IsActiveActions.changeStatusTinhTuers(data));
        }
        else if (state?.user?.role === 2) {
            const data = await fetchGet(`http://localhost:8888/user/getTinhTuerByIdHost`);
            dispatch(IsActiveActions.changeStatusTinhTuers(data));
            reff.current.innerText = 'Danh sách đơn hàng trên Tinh Tú của bạn';

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
    if (!state.isActiveTitle) return <></>;
    return (
        <>
            <div className="title" >
                <span ref={reff} className="hey"> Danh sách gia sư tinh tú</span>
                <FaHeart className='hert' />
                <  PiShoppingCartSimple onClick={handleCart} className='shopping' style={{ color: 'green', position: 'absolute', left: '1420px', bottom: '0px' }} />

            </div>
            <Modall />
        </>
    );
}
export default Title;