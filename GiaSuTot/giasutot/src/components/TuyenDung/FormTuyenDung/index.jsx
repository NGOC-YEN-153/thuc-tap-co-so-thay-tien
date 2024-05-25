import { useRef, useState } from "react";
import "./FormTuyenDung.css"
import fetchPost from "../../../Fetch/fetchPost";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
function FormTuyenDung() {
    const navigate = useNavigate();
    const refName = useRef(null);
    const refDob = useRef(null);
    const refNam = useRef(null);
    const refNu = useRef(null);
    const refQue = useRef(null);
    const refPhone = useRef(null);
    const refCareer = useRef(null);
    const refLiving = useRef(null);
    const refSV = useRef(null);
    const refGV = useRef(null);
    const refWant = useRef(null);
    const refExp = useRef(null);
    const refMota = useRef(null);
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
    const refThanhTich = useRef(null);
    const submit = async () => {
        const [name, dob, nam, nu, que, phone, nghe, living, sv, gv, want, exp, mota, thanhtich, image] = [
            refName.current.value,
            refDob.current.value,
            refNam.current.checked,
            refNu.current.checked,
            refQue.current.value,
            refPhone.current.value,
            refCareer.current.value,
            refLiving.current.value,
            refSV.current.value,
            refGV.current.value,
            refWant.current.value,
            refExp.current.value,
            refMota.current.value,
            refThanhTich.current.value,
        ];
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
        const gioiTinh = nam || nu;
        console.log(nam);
        console.log(nu);
        console.log(gioiTinh)
        await fetchPost('http://localhost:8888/guest/save', { name, dob, gioiTinh, que, phone, nghe, living, sv, gv, want, exp, mota, thanhtich, image, dataTime });
        setMessage('Chúng tôi đã ghi nhận kết quả ,sẽ liên hệ bạn sớm nhất');
        setShow(true);
        setTimeout(() => navigate('/TrangChu'), 3000);
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
            <form className="form-td">
                <img className='avt' src="https://www.w3schools.com/howto/img_avatar2.png"></img><br></br>
                <label htmlFor="hovaten" className="ele1">Họ và tên </label><br></br>
                <input ref={refName} placeholder="họ và tên" type="text" name="hovaten" id="hovaten" className="ele2" required></input><br></br>

                <label htmlFor="ngaysinh" className="ele3">Ngày sinh : </label><br></br>
                <input ref={refDob} placeholder="ngày sinh đúng định dạng dd/mm/yyyy" className="ele33" type="text" name="ngaysinh" id="ngaysinh" required></input><br></br>

                <label className="ele4">Giới tính : </label><br></br>
                <label className="ele5"> Nam   </label>
                <input ref={refNam} className="ele6" type="radio" name="gioitinh"></input><br></br>
                <label className="ele7"> Nữ :  </label>
                <input ref={refNu} className="ele8" type="radio" name="gioitinh"></input><br></br>
                <label className="ele9"> Quê quán : </label><br></br>
                <input ref={refQue} className="ele10" type="text" name='quequan' required></input><br></br>
                <label className="ele11"> Số điện thoại : </label><br></br>
                <input ref={refPhone} className="ele12" type="text" name='sodienthoai' required maxLength="40"></input><br></br>
                <label className="ele13"> Nghề nghiệp : </label><br></br>
                <input ref={refCareer} className="ele14" type="text" name='nghenghiep' required></input><br></br>
                <label className="ele15" > Nơi đang sinh sống : </label><br></br>
                <input ref={refLiving} className="ele16" type="text" name='live' required></input><br></br>
                <label className="ele17"> Sinh viên trường : </label><br></br>
                <input ref={refSV} className="ele18" type="text" name='sinhvientruong'></input><br></br>
                <div className="ele19">hoặc</div>
                <label className="ele20"> Giáo viên trường : </label><br></br>
                <input ref={refGV} className="ele21" type="text" name='giaovientruong'></input><br></br>
                <label className="ele22"> Kinh nghiệm đi dạy : </label><br></br>
                <input ref={refExp} className="ele23" name='experience' required placeholder="số năm hoặc tháng"></input><br></br>
                <label className="ele24"> Khu vực mong muốn nhận lớp  : </label><br></br>
                <input ref={refWant} className="position" type="text" name='position' required placeholder="ví dụ Hà Trì , Hà Cầu , Hà Đông , Hà Nội"></input><br></br>
                {/* ----------------------------- */}
                <label className="labelmonhoc"> Những môn muốn dạy học : </label><br></br>
                <input ref={refMota} className="monhoc" type="text" name='monhoc' required placeholder="ví dụ Toán 12 , Ngữ Văn cấp 2"></input><br></br>
                <label className="ele26" > Thời gian rảnh : </label><br></br>
                <table className="thoigianranh">
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
                <div className="thanh-tich">
                    <label className="ele27">Thành tích (nếu có ) :</label><br></br>
                    <input ref={refThanhTich} className="ele28" type="text" name='archive' placeholder="ví dụ : điểm thi thpt , có giải học sinh giỏi cấp tỉnh,..."></input><br></br>
                </div>
                <input onClick={submit} className="ele29" type="submit" value="Gửi cho trung tâm"></input>
            </form>
            <Modall />
        </>
    );
}
export default FormTuyenDung;