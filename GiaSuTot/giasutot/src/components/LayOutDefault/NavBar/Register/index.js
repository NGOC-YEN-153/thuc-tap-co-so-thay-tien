import "./Register.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../../../Reducers/IsActiveReducer';
import { NavLink } from "react-router-dom";
import md5 from "md5";
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react";
import fetchPost from '../../../../Fetch/fetchPost';
import { Button, Modal } from "react-bootstrap";
function check(phone) {
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char >= '0' && char <= '9');
        else return false;
    }
    if (phone.length >= 12 || phone.length <= 8) return false;
    if (phone[0] !== '0') return false;
    return true;
}
const checkEmail = (email) => {
    return email.endsWith('@gmail.com');
}
function Register() {
    const state = useSelector(state => state.IsActiveReduce);
    const [username, password, confirmPassword, male, female, dob, phone, email] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const dispatch = useDispatch();
    const handleX = () => {
        dispatch(IsActiveActions.changeStatusRegisterForm(false));
        dispatch(IsActiveActions.changeStatusLoginForm(true));
    }
    const validatePassword = (s) => {
        for (let i of s) {
            if (!(i >= '0' && i <= '9') && !(i >= 'a' && i <= 'z') && !(i >= 'A' && i <= 'Z') && i !== '!' && i !== '@' && i !== '#' && i !== '$' && i !== '%' && i !== '^' && i !== '&' && i !== '*' && i !== '_' && i !== '<' && i !== '>' && i !== '?') return false;
        }
        return true;
    }
    const checkDigit = (s) => {
        let ok = false;
        for (let i of s) {
            if (i >= '0' && i <= '9') ok = true;
        }
        return ok;
    }
    const checkChar = (s) => {
        let ok = false;
        for (let i of s) {
            if (i >= 'a' && i <= 'z') ok = true;
            if (i >= 'A' && i <= 'Z') ok = true;
        }
        return ok;
    }
    const checkSpecial = (s) => {
        let ok = false;
        for (let i of s) {
            if (i === '!') ok = true;
            else if (i === '@') ok = true;
            else if (i === '#') ok = true;
            else if (i === '$') ok = true;
            else if (i === '%') ok = true;
            else if (i === '^') ok = true;
            else if (i === '&') ok = true;
            else if (i === '*') ok = true;
            else if (i === '<') ok = true;
            else if (i === '>') ok = true;
            else if (i === '?') ok = true;
            else if (i === '_') ok = true;
        }
        console.log(s);
        return ok;
    }
    const match = (a, b) => {
        return a === b;
    }
    const checkDob = (s) => {
        //15/01/2003
        if (s.length !== 10) return false;
        for (let i = 0; i < s.length; i++) {
            if (i === 2 || i === 5) {
                if (s[i] !== '/') return false;
            }
            else {
                if (!(s[i] >= '0' && s[i] <= '9')) return false;
            }
        }
        return true;
    }
    const handleRegister = async () => {
        try {
            let ok = true;
            if (username.current.value === '') {
                setMessage('Nhập tên tài khoản bro ơi');
                setShow(true);
                ok = false;
            }
            else if (password.current.value === '') {
                setMessage('Nhập password bro ơi');
                setShow(true);
                ok = false;
            }
            else if (confirmPassword.current.value === '') {
                setMessage('Nhập lại mật khẩu bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!male.current.checked && !female.current.checked) {
                setMessage('Chọn giới tính bro ơi');
                setShow(true);
                ok = false;
            }
            else if (dob.current.value === '') {
                setMessage('Nhập sinh nhật bro ơi');
                setShow(true);
                ok = false;
            }

            else if (username.current.value.length < 7 || username.current.value.length > 20) {
                setMessage('Độ dài tài khoản chỉ từ 7-20 kí tự tính cả dấu cách bro ơi');
                setShow(true);
                ok = false;
            }

            else if (password.current.value.length < 6 || password.current.value.length >= 31) {
                setMessage('Độ dài mật khẩu chỉ từ 7-30 kí tự tính cả dấu cách bro ơi');
                setShow(true);
                ok = false;
            }

            else if (!validatePassword(password.current.value)) {
                setMessage('Mật khẩu chỉ được chứa các kí tự từ A-Z , 0-9 và các kí tự đặc biệt như !@#$% thôi bro ơi , không được dùng kí tự có dấu'); 
                ok = false;
                setShow(true);
            }
            else if (!checkDigit(password.current.value)) {
                setMessage('Mật khẩu phải chứa ít nhất 1 kí tự số bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!checkChar(password.current.value)) {
                setMessage('Mật khẩu phải chứa ít nhất 1 kí tự chữ bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!checkSpecial(password.current.value)) {
                setMessage('Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt bro ơi');
                setShow(true);
                ok = false;
            }

            else if (!validatePassword(confirmPassword.current.value)) {
                setMessage('Mật khẩu nhập lại chỉ được chứa các kí tự từ A-Z , 0-9 và các kí tự đặc biệt như !@#$% thôi bro ơi , không được dùng kí tự có dấu');
                setShow(true);
                ok = false;
            }
            else if (!checkDigit(confirmPassword.current.value)) {
                setMessage('Mật khẩu nhập lại phải chứa ít nhất 1 kí tự số bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!checkChar(confirmPassword.current.value)) {
                setMessage('Mật khẩu nhập lại phải chứa ít nhất 1 kí tự chữ bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!checkSpecial(confirmPassword.current.value)) {
                setMessage('Mật khẩu nhập lại phải chứa ít nhất 1 kí tự đặc biệt bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!match(password.current.value, confirmPassword.current.value)) {
                setMessage('Mật khẩu nhập lại không khớp bro ơi');
                setShow(true);
                ok = false;
            }

            else if (!checkDob(dob.current.value)) {
                setMessage('Sai định dạng dd/MM/yyyy bro ơi');
                setShow(true);
                ok = false;
            }
            else if (!check(phone.current.value)) {
                setMessage('Sai số điện thoại');
                setShow(true);
                ok = false;
            }
            else if (!checkEmail(email.current.value)) {
                setMessage('Sai Email');
                setShow(true);
                ok = false;
            }
            if (!ok) return;
            const [usernameData, passwordData, dobData, phoneData, emailData] = [username.current.value.trim(), md5(password.current.value), dob.current.value.trim(), phone.current.value.trim(), email.current.value.trim()];
            let genderData = false;
            if (male.current.checked) genderData = true;
            const message = await fetchPost('http://localhost:8888/guest/register', { usernameData, passwordData, dobData, genderData, phoneData, emailData });
            if (message.message === 'success') {
                setMessage('Đăng kí thành công anh yêu ơi !');
                setShow(true);
                setTimeout(() => {
                    dispatch(IsActiveActions.changeStatusRegisterForm(false));
                    dispatch(IsActiveActions.changeStatusLoginForm(true));
                } , 4000) ;
            }
            else {
                setMessage('Tên tài khoản đã tồn tại =((');
                setShow(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false) ; 
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
    if (!state.isActiveRegisterForm) return <></>;
    return (
        <>
            <form className="form-input-register">
                <div className="login-title add"> Sign up</div>

                <div className="element-register">
                    <label className="username-label" >Tài khoản</label>
                    <input className='username-input' type='text' maxLength='20' required ref={username} placeholder="độ dài tài khoản từ 7-20 kí tự" ></input>
                </div>

                <div className="element-register">
                    <label className="password-label">Mật khẩu</label>
                    <input className='password-input' type='password' maxLength='30' required ref={password} placeholder="độ dài mật khẩu từ 7-30 kí tự"></input>
                </div>

                <div className="element-register">
                    <label className="password-again-label"> Nhập lại mật khẩu</label>
                    <input className='password-again-input' type='password' maxLength='30' required ref={confirmPassword} placeholder="độ dài mật khẩu từ 7-30 kí tự"></input>
                </div>

                <div className="element-register" >
                    <label className="gender-register-label" required>Giới tính</label>

                    <input className="nam-radio" type="radio" name="gioitinh" ref={male}></input>
                    <label className="nam-label">Nam</label>

                    <input className="nu-radio" type="radio" name="gioitinh" ref={female}></input>
                    <label className="nu-label">Nữ</label>
                </div>

                <div className="element-register" >
                    <label className="ngaysinh-label" >Ngày sinh </label>
                    <input className='ngaysinh-input' type='text' maxLength='20' required placeholder="Định dạng dd/MM/yyyy" ref={dob}></input>
                </div>
                <div className="element-register">
                    <label className="phone-label" >Số điện thoại </label>
                    <input className='phone-input' type='text' maxLength="12" placeholder='Số điện thoại' ref={phone}></input>
                </div>
                <div className="element-register">
                    <label className="email-label" >Email </label>
                    <input className='email-input' type='text' maxLength="45" placeholder='Email , ví dụ example@gmail.com' ref={email}></input>
                </div>
                <div className="register-button" onClick={handleRegister}>Đăng kí</div>
                <FontAwesomeIcon className="X-register" icon={faTimesCircle} onClick={handleX} />
            </form>
            <Modall/>
        </>
    );
}
export default Register;