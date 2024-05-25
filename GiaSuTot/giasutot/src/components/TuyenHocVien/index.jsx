import { useEffect, useRef, useState } from 'react';
import './TuyenHocVien.css';
import { useDispatch, useSelector } from 'react-redux';
import fetchGet from '../../Fetch/fetchGet';
import fetchPost from '../../Fetch/fetchPost';
import { Button, Modal, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const TuyenHocVien = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const [Mons, setMons] = useState([]);
    const [Lops, setLops] = useState([]);
    const [city, setCity] = useState([]);
    const [listHuyen, setListHuyen] = useState([]);
    const [listXa, setListXa] = useState([]);
    const [stateMonHoc, setStateMonHoc] = useState('Môn học');
    const [stateLop, setStateLop] = useState('Lớp');
    const [stateThanhPho, setStateThanhPho] = useState('Thành phố');
    const [stateHuyen, setStateHuyen] = useState('Huyện');
    const [stateXa, setStateXa] = useState('Xã');
    const priceRef = useRef(null);
    const hourRef = useRef(null);
    const navigate = useNavigate();
    // const [stateGioiTinh, setStateGioiTinh] = useState('Giới tính');

    const fakeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const arrRef = [
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
        [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    ];
    const expRef = useRef(null);
    const loc = useLocation();
    useEffect(() => {
        (
            async () => {
                const data = await fetchGet('http://localhost:8888/guest/getTinhHuyenXa');
                const Mons = await fetchGet('http://localhost:8888/guest/getMonHoc');
                const Lops = await fetchGet('http://localhost:8888/guest/getLop');
                setCity(data.citys);
                setListHuyen(data.huyens);
                setListXa(data.xas);
                setMons(Mons);
                setLops(Lops);
                window.scrollTo(0, 0);

            }
        )();
    }, [loc]);
    const handleMon = (name) => {
        setStateMonHoc(name);
    }
    const handleLop = (name) => {
        setStateLop(name);
    }
    const handleCity = (name) => {
        setStateThanhPho(name);
    }
    const handleHuyen = (name) => {
        setStateHuyen(name)
    }
    const handleXa = (name) => {
        setStateXa(name);
    }
    const hsubmit = async () => {
        const exp = parseFloat(expRef.current.value);
        const price = parseInt(priceRef.current.value);
        const hour = parseFloat(hourRef.current.value);
        const dataTime = [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ];
        for (let i = 2; i <= 8; i++) {
            for (let j = 0; j < 24; j++) {
                dataTime[i][j] = arrRef[i][j].current.checked;
            }
        }
        const obj = { stateHuyen, stateLop, stateMonHoc, stateXa, stateThanhPho, exp, dataTime, price, hour, isCensored: state?.user?.profileCensore, gender: state?.user?.gender };
        obj.isCensored = state.user.profileCensore;
        const err = await fetchPost('http://localhost:8888/user/addTinhTuPost', obj);
        let message = '';
        if (state?.user?.profileCensore) message = ' , đơn hàng của bạn đã được cập nhật';
        else message = ' , đơn hàng của bạn đang được xem xét trước khi cập nhật, vui lòng chờ ';
        if (!(err instanceof Error)) {
            setMessage("Thành công " + message);
            setShow(true);
            setTimeout(() => {
                navigate('/TinhTu');
            }, 3000);
        }
        else {
            setMessage('Thất bại');
            setShow(true);
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
    return (
        <>
            <div className='tuyen-hoc-vien'>
                <div className='text-infoo'> Nhập thông tin gia sư</div>
                <div className='boot'>

                    {/* //////////////////////////////////////////////// */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '40px' }}>
                        <div className="dropdown mon-hoc">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {stateMonHoc}
                            </button>
                            <div className="dropdown-menu scrollable-dropdown dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    Mons?.map((mon, index) => {
                                        return <a className="dropdown-item" href="#" onClick={() => handleMon(mon?.name)}>{mon?.name}</a>

                                    })
                                }

                            </div>
                        </div>

                        {/* /////////////////////////////////////////////////////////////// */}
                        <div className="dropdown loppp">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {stateLop}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    Lops?.map((lop, index) => {
                                        return <a className="dropdown-item" href="#" onClick={() => handleLop(lop?.name)} >{lop?.name}</a>

                                    })
                                }
                            </div>
                        </div>

                        {/* /////////////////////////////////////////////// */}
                        <div className="dropdown citycity">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {stateThanhPho}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    city?.length !== 0 &&
                                    city?.map((item, index) => {
                                        return (
                                            <a className="dropdown-item" href="#" onClick={() => handleCity(item)}>
                                                {item}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                        <div className="dropdown huyenhuyen">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {stateHuyen}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm " aria-labelledby="dropdownMenuButton">
                                {
                                    listHuyen?.length !== 0 &&
                                    listHuyen?.map((item, index) => {
                                        return (
                                            stateThanhPho === item?.parent ? <a className={`dropdown-item`} href="#" onClick={() => handleHuyen(item?.name)}>
                                                {item.name}
                                            </a> : <></>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        {/* ///////////////////////////////////////////////// */}

                        <div className="dropdown xaxa">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {stateXa}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    listXa?.length !== 0 &&
                                    listXa?.map((item, index) => {
                                        return (
                                            stateHuyen === item.parent ? (
                                                <a className={`dropdown-item`} href="#" onClick={() => handleXa(item?.name)} key={index}>
                                                    {item?.name}
                                                </a>
                                            ) : <></>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>

                    {/* /////////////////////////////////////////////////////// */}



                    {/* ///////////////////////////////////////////////////////////////////// */}
                    <label className='lb exppp'> Kinh Nghiệm : </label>
                    <input type='text' placeholder='Số năm kinh nghiệm' className='exp-fill' ref={expRef}></input>

                    {/* ///////////////////// */}
                    <label className='lb price'> Giá : </label>
                    <input className='pricee' type='text' ref={priceRef} placeholder='Nhập giá '></input>
                    <label className='lb hourr'> Số giờ dạy  : </label>
                    <input className='pricee' type='text' ref={hourRef} placeholder='Số giờ'></input>
                    <label className='lb ra' >Thời gian rảnh : </label>

                    {/* //////////////////////////////////// */}

                </div>
                <table className="thoi-giann">
                    <thead>
                        <tr>
                            <th style={{ border: "#cccccc solid 1px" }}>Thứ/Giờ</th>
                            {
                                fakeArray?.map((value, index) => {
                                    return <th>{String(index).padStart(2, '0')}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', "Chủ nhật"].map((valuei, indexi) => {
                                return <tr>
                                    <td>{valuei}</td>
                                    {
                                        fakeArray?.map((valuej, indexj) => {
                                            return <td  ><input ref={arrRef[indexi + 2][indexj]} type="checkbox"></input></td>
                                        })
                                    }
                                </tr>
                            })
                        }


                    </tbody>
                </table>
                {/* /////// */}
                <button className='button-fix nop' onClick={hsubmit}>Gửi lên Tinh Tú</button>
                <Modall />
            </div>
        </>
    );
}
export default TuyenHocVien; 