import { useEffect, useRef, useState } from "react";
import "./CustomManage.css";

import fetchGet from "../../Fetch/fetchGet";
import queryString from "query-string";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { IsActiveActions } from "../../Reducers/IsActiveReducer";
import fetchPost from "../../Fetch/fetchPost";
import { Button, Modal } from "react-bootstrap";
function makeDay(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm

    return `${hours}:${minutes} ngày ${day}/${month}/${year}`;
}
function CustomManage() {
    const [Customer, setCustomer] = useState([]);
    const navigate = useNavigate();
    const [x, setX] = useState(false);
    const parameter = queryString.parse(window.location.search);
    const loc = useLocation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    useEffect(() => {
        (
            async () => {
                const data = await fetchGet('http://localhost:8888/admin/getCensore');
                setCustomer(data);
                window.scrollTo(0, 0);
            }
        )();
    }, [x, loc]);
    const deletee = async (index) => {
        try {
            await fetchPost(`http://localhost:8888/admin/reject`, { userId: Customer[index]?.userId });
            setMessage('Kiểm duyệt thành công');
            setShow(true);
            setTimeout(() => {
                setX(!x);
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    };
    const censore = async (index) => {

        navigate(`/ProfileWall?userId=${Customer[index]?.userId}&who=other`);
    }
    const ac = async (index) => {
        try {
            await fetchPost(`http://localhost:8888/admin/censore`, { userId: Customer[index]?.userId });
            setMessage(' Kiểm duyệt thành công');
            setShow(true);
            setTimeout(() => {
                setX(!x);
            }, 3000);
        } catch (error) {
            console.log(error);
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
    if (Customer?.length === 0) return <div className="title">
        Tuyệt vời , không có tài khoản nào cần xét duyệt
    </div>;
    return (
        <>
            <div className="custom-main">
                <div className="title">
                    Danh sách tài khoản xét duyệt
                </div>
                <table className="table table-striped bf">
                    <thead>
                        <tr>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center', width: '1px' }} ></th>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} >Tài khoản</th>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} >Tùy chọn</th>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }} >Thời gian</th>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }}  >Duyệt </th>
                            <th scope="col" style={{ backgroundColor: '#0693e3', color: 'white', textAlign: 'center' }}  >Xóa </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Customer?.map((custom, index) => {
                                return (
                                    <tr>
                                        <th style={{ textAlign: 'center' }}   ><span className="cuss">#{index}</span></th>
                                        <th ><img className='small-avatarr' src={custom.linkAvatar} alt="avt" style={{ marginRight: '10px' }} /> <span>{custom.name}</span></th>
                                        <td style={{ textAlign: 'center' }} onClick={() => censore(index)}  > <LuEye className='cuss' /> <NavLink className='cuss'> Xem </NavLink></td>
                                        <th style={{ textAlign: 'center' }}  ><span className="cuss">{makeDay(custom.createdAt)}</span></th>
                                        <th style={{ textAlign: 'center' }} ><button onClick={() => ac(index)} className='button-fix cuss'>Duyệt</button></th>
                                        <th style={{ textAlign: 'center' }} ><button onClick={() => deletee(index)} className='button-fix cuss'>xóa</button></th>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Modall />
        </>
    );
}
export default CustomManage;