import 'bootstrap/dist/css/bootstrap.min.css';
import "./Footer.css";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faVolumeControlPhone, faEnvelope, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { isActiveActions } from '../../../Reducers/IsActiveReducer'
import { CiFacebook } from "react-icons/ci";

import { useSelector, useDispatch } from "react-redux";
function Footer() {
    const status = useSelector(state => state.IsActiveReduce);
    if (!status.isActiveChanTrang) return <></>;
    return (
        <>
            <div className="chantrang">
                <div className="Contact" >
                    <h2>Liên hệ</h2>
                    <FontAwesomeIcon icon={faMapMarker} style={{ color: 'grey' }} />
                    <h3> Trụ Sở 1 : PTIT</h3><br></br><br></br>
                    <FontAwesomeIcon icon={faMapMarker} style={{ color: 'grey' }} />
                    <h3> Trụ sở 2 : HVCN-BCVT</h3><br></br><br></br>
                    <FontAwesomeIcon icon={faVolumeControlPhone} style={{ color: 'grey' }} />
                    <h3> Tư vấn miễn phí : 0705 48 7905</h3><br></br><br></br>
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: 'grey' }} />
                    <h3> Email : MyPTIT@gmail.com</h3><br></br><br></br>
                    <NavLink to='https://www.facebook.com/foreverandalways153' >< CiFacebook style={{ transform: 'scale(1.6)' }} />
                        <h3> Facebook.com/GiaSuTot</h3><br></br></NavLink>
                </div>
                <div className="gia-su-ngoai-ngu" >
                    <h2> Tìm Gia Sư Ngoại Ngữ</h2>
                    <NavLink to="/TinhTu">
                        <h3>Tiếng Anh</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Tiếng Hàn</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Tiếng Nhật</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Tiếng Trung</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Tiếng Nga</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Toeic</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>IELTS</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>TOEIC</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Ngoại ngữ khác</h3><br></br>
                    </NavLink>
                </div>
                <div className="gia-su-khong-phai-ngoai-ngu" >
                    <h2>Tìm Gia Sư kèm các môn</h2>
                    <NavLink to="/TinhTu">
                        <h3>Toán</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Ngữ Văn</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Hóa Học</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Vật Lí</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Sinh Học</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Âm nhạc</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Công nghệ</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Các môn khác</h3><br></br>
                    </NavLink>
                </div>
                <div className="gia-su-dai-hoc" >
                    <h2>Tìm Gia Sư kèm môn đại học</h2>
                    <NavLink to="/TinhTu">
                        <h3>Lập trình C++</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Cấu trúc dữ liệu và giải thuật</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Lập trình C</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Lập trình Java</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Kiến trúc máy tính</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Kĩ thuật số</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Nhập môn công nghệ phần mềm</h3><br></br>
                    </NavLink>
                    <NavLink to="/TinhTu">
                        <h3>Các môn khác</h3><br></br>
                    </NavLink>
                </div>
                <div className="muc-luc" >
                    <h2>Mục Lục</h2>
                    <NavLink to='/HoiDap'><h3>Câu hỏi thường gặp</h3><br></br></NavLink>
                    <NavLink><h3>Điều khoản dịch vụ</h3><br></br></NavLink>
                    <NavLink><h3>Chính sách bảo mật</h3><br></br></NavLink>
                </div>
            </div>
            <div className='copy-right'>Copyright by @NgocYenPTIT</div>
        </>
    );
}
export default Footer;