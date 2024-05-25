import "./Navigate.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../../../Reducers/IsActiveReducer';
import Login from "../Login";
import Register from "../Register";
import Profile from "../../../Profile";
import { IoMdSearch } from "react-icons/io";
import { Button, Modal, Form } from 'react-bootstrap';
import ProfileModal from "../../../ProfileModal";
import { useEffect, useRef, useState } from "react";
import fetchGet from "../../../../Fetch/fetchGet";
import ChangePassWord from "../../../ChangePassWord";
function Navigate() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const refInput = useRef(null);
    const handleClick = () => {
        dispatch(IsActiveActions.changeStatusLogin(false));
        dispatch(IsActiveActions.changeStatusBodyFooter(false));
        dispatch(IsActiveActions.changeStatusLoginForm(true));
    }
    useEffect(() => {
        console.log('naviagate render');
    }, []);
    const find = async () => {
        const userId = refInput.current.value.trim()?.slice(2);
        const phone = (await fetchGet(`http://localhost:8888/user/getPhone?userId=${userId}`));
        const email = (await fetchGet(`http://localhost:8888/user/getEmail?userId=${userId}`));
        if (!phone || !email) {
            setContentState('Không tìm thấy gia sư , kiểm tra lại.');
            setShow(true);
        }
        else {
            setContentState(phone + '    -   ' + email);
            setShow(true);
        }
    }
    const [show, setShow] = useState(false);
    const [contentState, setContentState] = useState('');
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
                        <Modal.Title>Số điện thoại và email của gia sư</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {contentState}
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
            <div className="navigate">
                <NavLink to='/'>
                    <span className="navigateChild trangchuu">Trang Chủ</span>
                </NavLink>
                {state?.user?.role !== 3 ?  <NavLink to='/TinhTu'>
                    <span className="navigateChild tinhtuu">Tinh Tú</span>
                </NavLink> : <></>}
                <NavLink to='/rank'>
                    <span className="navigateChild bxhh"> Bảng xếp hạng </span>
                </NavLink>
                {
                   ( state?.user?.role !== 3) ? <NavLink to='/TimGiaSu'>
                        <span className="navigateChild timgiasuu">Tìm Gia Sư</span>
                    </NavLink> : <></>
                }
                {(!state?.user?.role || state?.user?.role === 2) ? <NavLink to='/TuyenDung'>
                    <span className="navigateChild timhocvienn">Tìm học viên</span>
                </NavLink> : <></>}
                <NavLink to='/HoiDap'>
                    <span className="navigateChild hoidapp">Hỏi Đáp</span>
                </NavLink>
                {state?.user?.role === 3 ? <span className="searchh">
                    <input type='text' className="navigateChild fi" ref={refInput}></input> <IoMdSearch onClick={find} style={{ color: 'white', transform: 'scale(1.6)' }} className="tool" />
                </span> : <></>}
                {
                    !state.user ? <NavLink className="login" onClick={handleClick}>
                        <span className="navigateChild">Đăng nhập</span>
                    </NavLink>
                        :
                        <></>
                }
                {state.isActiveLoginForm ? <Login /> : <></>}
                {state.showChangePass ? <ChangePassWord /> : <></>}
                {state.user ? <Profile /> : <></>}
                {state.isActiveRegisterForm ? <Register /> : <></>}
                {state.isActiveProfileModal ? <ProfileModal /> : <></>}
                <Modall />
            </div>
        </>
    );
}
export default Navigate;