import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import Navigate from '../LayOutDefault/NavBar/Navigate';
import "./TuyenDung.css";
import { useEffect } from 'react';
function TuyenDung() {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            if(document.querySelector('.timgiasuu'))document.querySelector('.timgiasuu').style.border = '1px solid #0693e3 ';
            if(document.querySelector('.trangchuu'))document.querySelector('.trangchuu').style.border = '1px solid #0693e3';
            if(document.querySelector('.tinhtuu'))document.querySelector('.tinhtuu').style.border = '1px solid #0693e3';
            if(document.querySelector('.bxhh'))document.querySelector('.bxhh').style.border = '1px solid #0693e3';
            if(document.querySelector('.timhocvienn'))document.querySelector('.timhocvienn').style.border = '1px solid white';
            if(document.querySelector('.hoidapp'))document.querySelector('.hoidapp').style.border = '1px solid #0693e3';
        } catch (error) {

        }
    }, []);
    const handleLogin = () => {
        dispatch(IsActiveActions.changeStatusLogin(false));
        dispatch(IsActiveActions.changeStatusLoginForm(true));
        dispatch(IsActiveActions.changeStatusBodyFooter(false));
    }
    return (
        <>
            <div className='tuyendung'>
                <div className='titletuyendung'>Tuyển dụng</div>
                <div className='chitiettuyendung'>Hiện nay gia sư có thể ứng tuyển nhận lớp gia sư qua 2 hình thức dưới đây ,khuyến khích kết hợp cả 2 hình thức để gia tăng cơ hội nhận lớp như ý .</div>
                <div className='tuyendung1'>
                    <div className='titletuyendung1'>Hình thức 1 : Thủ công</div>
                    <div className='buoc'> Bước 1 : Gia sư xem danh sách các lớp chưa được giao <NavLink to='#'>tại đây</NavLink> hoặc liên hệ trực tiếp trung tâm để được tư vấn miễn phí</div>
                    <div className='buoc'> Bước 2 : Gia sư đọc kĩ các <NavLink to='#'>điều khoản hợp đồng</NavLink> , nếu gia sư cảm thấy phù hợp thì tiếp tục bước 3</div>
                    <div className='buoc'> Bước 3 : Sau khi cảm thấy muốn nhận lớp ,Gia sư điền vào mẫu <NavLink to='/FormTuyenDung'>tại đây</NavLink> , sau đó các bạn nhân viên của trung tâm sẽ xem xét hồ sơ và phản hồi lại bạn trong vòng tối đa 6 tiếng.</div>
                    <div className='buoc buoc4'> Lưu ý : Liên hệ trực tiếp với các bạn nhân viên của trung tâm là cách nhanh chóng nhất để nhận lớp . </div>
                </div>
                <div className='tuyendung2'>
                    <div className='titletuyendung2'>Hình thức 2 : Chủ động </div>
                    <div className='buoc'> Bước 1 : Gia sư <span onClick={handleLogin}><NavLink to='#'>đăng nhập</NavLink></span> vào tài khoản GiaSuTot</div>
                    <div className='buoc'> Bước 2 : Gia sư  hoàn thiện hồ sơ cá nhân gồm tên tuổi , ngày sinh , địa chỉ sinh sống  , ... theo hướng dẫn sau :vào mục Hồ Sơ ( góc phải phía trên màn hình) -&gt chọn mục Thông Tin Cá Nhân -&gt hoàn thiện thông tin cá nhân</div>
                    <div className='buoc'> Bước 3 : Gia sư đăng tải  các ảnh thành tích của bản thân ,  video giới thiệu bản thân , sở trường liên quan đến giáo dục của bản thân , mô tả cách truyền tải kiến thức và xử lí tình huống khi học sinh chưa hiểu bài , ... đây là phần không bắt buộc , nếu cóthì  cơ hội nhận lớp như ý sẽ cao hơn</div>
                    <div className='buoc'> Bước 4 : Đặc biệt đối với các bạn gia sư Ngoại ngữ , video phát âm ngoại ngữ là đặc biệt quan trọng</div>
                    <div className='buoc'> Bước 5 : Sau khi hoàn thiện hồ sơ , gia sư tạo một phiếu tuyển học viên , nếu tài khoản của gia sư đã được kiểm duyệt , phiếu của gia sư sẽ có mặt trong mục <NavLink to='/TinhTu'>Tinh Tú</NavLink> với số sao khởi điểm là 0 , khi này phụ huynh có thể nhìn thấy gia sư và nếu hài lòng phụ huynh sẽ liên lạc với trung tâm và trung tâm sẽ liên lạc với gia sư. </div>
                    <div className='note'>
                        <div className='titlenote'>Lưu ý :</div>
                        <div className='notecontent'>1) Gia sư không được phép đăng tải các ảnh và video chứa nội dung liên quan tới địa chỉ , hình thức liên lạc ví dụ số điện thoại , email , liên kết mạng xã hội , nếu vi phạm sẽ không được trung tâm duyệt.</div>
                        <div className='notecontent'>2) Mọi thông tin của gia sư là bảo mật , chỉ khi gia sư bật chế độ công khai , người khác mới có thể xem.</div>
                    </div>
                    <div className='advantage'>
                        <div className='titleadvantage'>Lợi thế của phương pháp này :</div>
                        <div className='advantage1'>1) Khi được nhận lớp , tài khoản của phụ huynh sẽ được phép đánh giá tài khoản của gia sư thông qua hành động đánh giá sao và bình luận về chất lượng gia sư sau mỗi 14 ngày , hành động này giúp đánh giá về chất lượng gia sư giảng dạy .</div>
                        <div className='advantage1'>2) Sở hữu càng nhiều sao và bình luận tích cực , tài khoản của gia sư sẽ nhận được danh hiệu tương ứng qua mỗi mốc , nhờ vậy trong tương lai nếu muốn nhận thêm lớp , tài khoản của gia sư sẽ được xếp cao hơn trong danh sách <NavLink to='/TinhTu'>Tinh Tú</NavLink> , đồng thời nếu đủ số sao sẽ không cần trả phí nhận lớp vì phụ huynh sẽ đóng thay gia sư , qua đó có nhiều cơ hội tìm kiếm lớp như ý hơn.</div>
                    </div>
                </div><br></br><br></br><br></br><br></br><br></br><br></br>
                <FontAwesomeIcon className="faLongArrowRight" icon={faLongArrowRight} style={{ transform: "scale(1.5)" }} />
                <div className='ketluan'>Hình thức 1 ít tính chủ động hơn hình thức 2, Gia sư nên cân nhắc kết hợp cả 2 hình thức để nhanh chóng tìm được lớp như ý.</div>
            </div>
            <Navigate />
        </>
    );
}
export default TuyenDung;