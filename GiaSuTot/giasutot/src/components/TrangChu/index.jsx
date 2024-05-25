import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TrangChu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CiFacebook } from "react-icons/ci";
import { Button, Modal, Form } from 'react-bootstrap';
import { RiParentFill } from "react-icons/ri";
import fetchPost from '../../Fetch/fetchPost';
import { FaHeart } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

// font-family: "Gill Sans", sans-serif;
function TrangChu() {
    const state = useSelector(state => state.IsActiveReduce);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loc = useLocation();
    const handleSubmitPhone = async (e) => {
        const url = 'http://localhost:8888/guest/phonenumbercustom';
        const phone = document.querySelector('.input').value;
        const data = await fetchPost(url, { name: phone });
        dispatch(IsActiveActions.changeStatusMessage(data.message));
        setShow(true);
    }
    useEffect(() => {
        console.log('ttrang chu render');
        window.scrollTo(0, 0);
        if (document.querySelector('.trangchuu')) document.querySelector('.trangchuu').style.border = '1px solid white';
        if (document.querySelector('.tinhtuu')) document.querySelector('.tinhtuu').style.border = '1px solid #0693e3';
        if (document.querySelector('.bxhh')) document.querySelector('.bxhh').style.border = '1px solid #0693e3';
        if (document.querySelector('.timgiasuu')) document.querySelector('.timgiasuu').style.border = '1px solid #0693e3 ';
        if (document.querySelector('.timhocvienn')) document.querySelector('.timhocvienn').style.border = '1px solid #0693e3';
        if (document.querySelector('.hoidapp')) document.querySelector('.hoidapp').style.border = '1px solid #0693e3';
    }, [loc]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Chúng tôi sẽ liên hệ tới bạn trong vòng 6 tiếng sắp tới.');
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
            <div className="trangchu">
                <div className="gioithieu">
                    <div className='giasutot'>GiaSuTot - Cầu Nối</div>
                    <div className="caunoitrithucviet"> Tri Thức Việt <FaGraduationCap className='heart' /> </div>
                    <div className="chitiet">
                        <RiParentFill /> GiaSuTot cùng sứ mệnh cầu nối giúp phụ huynh tìm được gia sư chất lượng để đồng hành cùng con em !
                    </div>
                </div>
                <img style={{ position: "relative", left: "300px" }} src='https://th.bing.com/th/id/R.1982698c5938851f9dd61bb90250c2e4?rik=7NhGDIFFUasgxA&riu=http%3a%2f%2fwww.milestonescommunityschool.org%2fsites%2fdefault%2ffiles%2fabout-us.jpg&ehk=NDrb%2brjyHCI0GCXw28WWBwE6jSDLrff%2bq2b6Ab2zRGc%3d&risl=&pid=ImgRaw&r=0' alt="aboutus"></img>
                <div>
                    <div className='gioithieusoluoc'>Giới thiệu sơ lược</div>
                    <div className='contentgioithieusoluoc'>Ra đời ngày 09/03/2024 tại PTIT với đội ngũ làm việc dày dặn kinh nghiệm trong lĩnh vực Giáo dục ,đến nay đã được 20 năm hình thành và phát triển ,  GiaSuTot luôn tự hào là một trong những trung tâm gia sư uy tín và chất lượng nhất Việt Nam . </div>
                    <div className='contentgioithieusoluoc'>Với khẩu hiệu : Sự hài lòng của khách hàng là niềm vui và là niềm tự hào của chúng tôi , GiaSuTot không ngừng nỗ lực nâng cao chất lượng dịch vụ để trở thành trung tâm gia sư số 1 PTIT.</div>
                    <div className='contentgioithieusoluoc'>Tính đến thời điểm hiện tại GiaSuTot đã đồng hành cùng gần 10.000 phụ huynh và gia sư trong hành trình ươm mầm tri thức, GiaSuTot luôn mong muốn ngày càng hỗ trợ được nhiều khách hàng hơn nữa trong tương lai.</div>
                </div>
                {/* -------------------------------------------------------------------------------------------- */}
                <div className="visaochongiasutot">
                    <div className="titlevisaochongiasutot">Vì sao chọn GiaSuTot</div>
                    <div className="lidochon">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
                        <span>    Luôn cố gắng cung cấp cái nhìn trực quan nhất giúp phụ huynh tham khảo thêm thông tin về gia sư</span>
                    </div>
                    <div className="lidochon">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
                        <span>   Thông tin gia sư rõ ràng : thẻ sinh viên , thẻ giáo viên , CMND , giấy giới thiệu,thành tích cá nhân</span>
                    </div>
                    <div className="lidochon">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
                        <span>   Trung tâm cho phép học thử miễn phí 1 buổi , nếu không phù hợp sẽ được giới thiệu gia sư khác trong thời hạn 1 tháng từ khi kí hợp đồng</span>
                    </div>
                    <div className="lidochon">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
                        <span>   Trung tâm luôn phục vụ nhiệt tình , thời gian nhanh chóng , hiệu quả</span>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------------? */}
                <table className="dieudacbiet">
                    <thead className='titledieudacbiet'>
                        <tr>
                            <th colSpan="2">Điều đặc biệt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="titlephuhuynh">Phụ Huynh</td>
                            <td className="titlegiasu">Gia Sư</td>
                        </tr>
                        <tr>
                            <td className="contentgiasu">Ngoài hình thức tìm gia sư truyền thống là được trung tâm giới thiệu và sau đó học thử , quý phụ huynh giờ đây hoàn toàn có thể chủ động tìm hiểu  thêm thông tin về các gia sư (ví dụ giọng phát âm ngoại ngữ , ...) <NavLink to='/TinhTu'>tại đây</NavLink>, qua đó có nhiều sự lựa chọn hơn .</td>
                            <td className="contentphuhuynh">Bên cạnh phương pháp chờ trung tâm tìm và giao lớp , gia sư giờ đây có thể đăng tải ảnh và video giới thiệu thêm về bản thân trong phần #Hồ sơ , qua đó  gia tăng cơ hội tìm học sinh như ý .</td>
                        </tr>
                    </tbody>
                </table>
                {/* ---------------------------------------------------------------- */}
                <form className='tuvanmienphi'>
                    <div className='guiyeucautuvanmienphi'>Gửi yêu cầu tư vấn miễn phí</div>
                    <div className='vuilongdelaisodienthoai'> Vui lòng để lại số điện thoại, chúng tôi sẽ liên hệ tư vấn bạn trong thời gian sớm nhất .</div>
                    <input className='input' type='text' maxLength="12" placeholder='Số điện thoại'></input>
                    <input className="submit" type='button' value="Đăng kí" onClick={handleSubmitPhone}></input>
                    <div className='sodienthoaichuachinhxac'> {state.message}</div>
                </form>
            </div>
            <Modall />
        </>
    )
}
export default TrangChu;