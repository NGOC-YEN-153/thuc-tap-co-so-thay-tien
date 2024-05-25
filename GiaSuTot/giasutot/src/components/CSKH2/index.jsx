import { useEffect, useRef, useState } from "react";
import "./CSKH2.css"
import fetchGet from "../../Fetch/fetchGet";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
function CSKH2() {
    const [data, setData] = useState([]);
    const parameter = queryString.parse(window.location.search);
    const fakeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const loc = useLocation();
    useEffect(() => {
        (
            async () => {
                const data = await fetchGet(`http://localhost:8888/admin/getThongKe?thongKeId=${parameter.thongKeId}`);
                setData(data);
                const dateTimeString = data?.dataTime;
                let index = 3;
                for (let i = 2; i <= 8; i++) {
                    for (let j = 0; j < 24; j++) {
                        let ok = false;
                        if (dateTimeString?.[index] === '1') ok = true;
                        console.log(dateTimeString?.[index])
                        document.querySelector(`.hs${String(i).padStart(2, '0')}${String(j).padStart(2, '0')}`).checked = ok;
                        index += 4;
                    }
                };
                if (data?.gioiTinh === 'Nam') document.querySelector('.ele6').checked = true;
                else document.querySelector('.ele8').checked = true;
                window.scrollTo(0, 0);
            }
        )();
    }, [loc]);
    return (
        <>
            <form className="form-td">
                <img className='avt' src="https://www.w3schools.com/howto/img_avatar2.png"></img><br></br>
                <label htmlFor="hovaten" className="ele1">Họ và tên </label><br></br>
                <input readOnly value={data?.name} placeholder="họ và tên" type="text" name="hovaten" id="hovaten" className="ele2" required></input><br></br>

                <label htmlFor="ngaysinh" className="ele3">Ngày sinh : </label><br></br>
                <input readOnly value={data?.dob} placeholder="ngày sinh đúng định dạng dd/mm/yyyy" className="ele33" type="text" name="ngaysinh" id="ngaysinh" required></input><br></br>

                <label className="ele4">Giới tính : </label><br></br>
                <label className="ele5"> Nam   </label>
                <input readOnly className="ele6" type="radio" name="gioitinh"></input><br></br>
                <label className="ele7"> Nữ :  </label>
                <input readOnly className="ele8" type="radio" name="gioitinh"></input><br></br>
                <label className="ele9"> Quê quán : </label><br></br>
                <input readOnly value={data.que} className="ele10" type="text" name='quequan' required></input><br></br>
                <label className="ele11"> Số điện thoại : </label><br></br>
                <input readOnly value={data?.phone} className="ele12" type="text" name='sodienthoai' required maxLength="10"></input><br></br>
                <label className="ele13"> Nghề nghiệp : </label><br></br>
                <input readOnly value={data?.nghe} className="ele14" type="text" name='nghenghiep' required></input><br></br>
                <label className="ele15" > Nơi đang sinh sống : </label><br></br>
                <input readOnly value={data?.living} className="ele16" type="text" name='live' required></input><br></br>
                <label className="ele17"> Sinh viên trường : </label><br></br>
                <input readOnly value={data?.sv} className="ele18" type="text" name='sinhvientruong'></input><br></br>
                <div className="ele19">hoặc</div>
                <label className="ele20"> Giáo viên trường : </label><br></br>
                <input readOnly value={data?.gv} className="ele21" type="text" name='giaovientruong'></input><br></br>
                <label className="ele22"> Kinh nghiệm đi dạy : </label><br></br>
                <input readOnly value={data?.exp} className="ele23" name='experience' required placeholder="số năm hoặc tháng"></input><br></br>
                <label className="ele24"> Khu vực mong muốn nhận lớp  : </label><br></br>
                <input readOnly value={data?.want} className="position" type="text" name='position' required placeholder="ví dụ Hà Trì , Hà Cầu , Hà Đông , Hà Nội"></input><br></br>
                {/* ----------------------------- */}
                <label className="labelmonhoc"> Những môn muốn dạy học : </label><br></br>
                <input readOnly value={data?.mota} className="monhoc" type="text" name='monhoc' required placeholder="ví dụ Toán 12 , Ngữ Văn cấp 2"></input><br></br>
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
                            ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', "Chủ nhật"]?.map((valuei, indexi) => {
                                return <tr>
                                    <td>{valuei}</td>
                                    {
                                        fakeArray?.map((valuej, indexj) => {
                                            return <td  ><input readOnly className={`hs${String(indexi + 2).padStart(2, '0')}${String(indexj).padStart(2, '0')}`} type="checkbox"></input></td>
                                        })
                                    }
                                </tr>
                            })
                        }


                    </tbody>
                </table>
                <div className="thanh-tich">
                    <label className="ele27">Thành tích (nếu có ) :</label><br></br>
                    <input readOnly value={data?.thanhtich} className="ele28" type="text" name='archive' placeholder="ví dụ :điểm thi đại học , có giải học sinh giỏi cấp tỉnh,..."></input><br></br>
                </div>
            </form>
        </>
    );
}
export default CSKH2;