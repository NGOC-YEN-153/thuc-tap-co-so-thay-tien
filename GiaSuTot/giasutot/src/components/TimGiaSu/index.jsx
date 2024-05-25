import { useEffect } from 'react';
import './TimGiaSu.css';
import { NavLink } from 'react-router-dom';
const TimGiaSu = () => {
    useEffect(() => {        
        if(document.querySelector('.trangchuu'))document.querySelector('.trangchuu').style.border = '1px solid #0693e3' ;
        if(document.querySelector('.tinhtuu'))document.querySelector('.tinhtuu').style.border = '1px solid #0693e3' ;
        if(document.querySelector('.bxhh'))document.querySelector('.bxhh').style.border = '1px solid #0693e3' ; 
        if(document.querySelector('.timgiasuu'))document.querySelector('.timgiasuu').style.border = '1px solid white ' ; 
        if(document.querySelector('.timhocvienn'))document.querySelector('.timhocvienn').style.border = '1px solid #0693e3' ; 
        if(document.querySelector('.hoidapp'))document.querySelector('.hoidapp').style.border = '1px solid #0693e3' ; 
    } , []) ; 
    return (
        <>
            <div className='chitiet add-config'>
                GiaSuTot cùng bạn tìm gia sư đúng ý
            </div>
            <div className='main-content'>
                <div className='way'>
                    1) Tham khảo danh sách gia sư tinh tú của GiaSuTot với nhiều lượt đánh giá tích cực tại <NavLink to='/TinhTu'>Tinh Tú</NavLink>.
                </div>
                <div className='way'>
                    2) Vẫn còn rất nhiều gia sư tiềm năng bên cạnh <span style={{ fontStyle: 'italic', fontSize: '20px' }}>Tinh Tú</span>, <span style={{ fontStyle: 'italic', fontSize: '20px', color: 'red' }}>liên hệ trực tiếp</span> trung tâm để được các bạn tư vấn viên hỗ trợ bạn .
                </div>
                <div className='way note-note'>
                    * Lưu ý : chọn lựa gia sư với trên 5000 sao trên <NavLink to='/TinhTu'>Tinh Tú</NavLink> , phụ huynh sẽ hỗ trợ phí nhận lớp thay cho gia sư.
                </div>
            </div>
        </>
    );
}
export default TimGiaSu;