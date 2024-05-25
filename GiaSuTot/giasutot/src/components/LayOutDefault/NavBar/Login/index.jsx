import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import { useRef, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../../../Reducers/IsActiveReducer';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import fetchPost from '../../../../Fetch/fetchPost';
import fetchGet from "../../../../Fetch/fetchGet";
import { setCookie } from "../../../Cookies";
//check ddinhj dangj 15/23/2003
function Login() {
    const state = useSelector(state => state.IsActiveReduce);
    const [username, password] = [useRef(null), useRef(null)];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleX = () => {
        dispatch(IsActiveActions.changeStatusLoginForm(false));
        dispatch(IsActiveActions.changeStatusLogin(true));
        dispatch(IsActiveActions.changeStatusBodyFooter(true));
    }
    const handleLogin = async () => {
        console.log('login rendered');
        const account = username.current.value;
        const pass = md5(password.current.value);
        const tokenAndRole = await fetchPost('http://localhost:8888/guest/getToken', { account, pass });
        // expireTimes.setTime(expireTimes.getTime() + (1 * 3600 * 5000));
        if (tokenAndRole?.message === 'fail') {
            setTimeout(() => {
                dispatch(IsActiveActions.changeStatusFailLogin(false));
            }, 0);
            setTimeout(() => {
                dispatch(IsActiveActions.changeStatusFailLogin(true));
            }, 500);
        }
        else {
            setCookie('token', tokenAndRole.token, { 'max-age': 36000 });
            const users = await fetchGet('http://localhost:8888/user/getUserInfo');
            dispatch(IsActiveActions.changeStatusUser(users[0]));
            dispatch(IsActiveActions.changeStatusLoginForm(false));
            dispatch(IsActiveActions.changeStatusLogin(false));
            dispatch(IsActiveActions.changeStatusBodyFooter(true));
        }
    }
    const handleSignup = () => {
        dispatch(IsActiveActions.changeStatusLoginForm(false));
        dispatch(IsActiveActions.changeStatusRegisterForm(true));
    }

    return (
        <>
            <form className="form-input">
                <div className="login-title"> Sign in</div>
                <label onFocus='#username-input' id="username-label">Username</label>
                <input type='text' maxLength='30' id='username-input' name="username-input" ref={username} value={state.username}></input>
                <label onFocus='#password-input' id="password-label">Password</label>
                <input type='password' maxLength='30' id='password-input' name="password-input" ref={password}></input>
                <div id='need-an-account'>Need an account? </div>
                <NavLink id='sign-up' onClick={handleSignup}>Sign up</NavLink>
                {
                    state.isActiveFailLogin ?
                        <>
                            <span className="fail-login"> Sai tài khoản hoặc mật khẩu</span>
                        </>
                        :
                        <></>
                }
                <div id="login-button" onClick={handleLogin}>Log in</div>
                <FontAwesomeIcon className="X" icon={faTimesCircle} onClick={handleX} />
            </form>
        </>
    );
}
export default Login;