import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import "./HoiDap.css";
import { useEffect, useState } from 'react';
function HoiDap() {
    const [state1, setState1] = useState(faAngleDown); const [state2, setState2] = useState(faAngleDown);
    const [state3, setState3] = useState(faAngleDown); const [state4, setState4] = useState(faAngleDown);
    const [state5, setState5] = useState(faAngleDown); const [state6, setState6] = useState(faAngleDown);
    const [state7, setState7] = useState(faAngleDown); const [state8, setState8] = useState(faAngleDown);
    const [state9, setState9] = useState(faAngleDown); const [state10, setState10] = useState(faAngleDown);
    const [state11, setState11] = useState(faAngleDown); const [state12, setState12] = useState(faAngleDown);
    const [state13, setState13] = useState(faAngleDown); const [state14, setState14] = useState(faAngleDown);
    const [state15, setState15] = useState(faAngleDown); const [state16, setState16] = useState(faAngleDown);
    const [state17, setState17] = useState(faAngleDown); const [state18, setState18] = useState(faAngleDown);
    const state = [0, state1, state2, state3, state4, state5, state6, state7, state8, state9, state10, state11, state12, state13, state14, state15, state16, state17, state18];
    const setState = [0, setState1, setState2, setState3, setState4, setState5, setState6, setState7, setState8, setState9, setState10, setState11, setState12, setState13, setState14, setState15, setState16, setState17, setState18];
    const location = useLocation();
    const handleAnswer = (id) => {
        return () => {
            const status = state[id];
            if (status === faAngleDown) {
                setState[id](faAngleUp);
                document.querySelector(`.answer${id}`).style.display = 'block';
            }
            else {
                setState[id](faAngleDown);
                document.querySelector(`.answer${id}`).style.display = 'none';
            }
        }
    }
    useEffect(() => {
        (
            async () => {
                window.scrollTo(0, 0);
                if(document.querySelector('.trangchuu'))document.querySelector('.trangchuu').style.border = '1px solid #0693e3' ;
                if(document.querySelector('.tinhtuu'))document.querySelector('.tinhtuu').style.border = '1px solid #0693e3' ;
                if(document.querySelector('.bxhh'))document.querySelector('.bxhh').style.border = '1px solid #0693e3' ; 
                if(document.querySelector('.timgiasuu')) document.querySelector('.timgiasuu').style.border = '1px solid #0693e3 ' ; 
                if(document.querySelector('.timhocvienn'))document.querySelector('.timhocvienn').style.border = '1px solid #0693e3' ; 
                if(document.querySelector('.hoidapp'))document.querySelector('.hoidapp').style.border = '1px solid white' ;
            }
        )();
    }, [location]);
    return (
        <>
            <div className="hoidap">
                <div className='beforecaccauhoithuonggap'>
                    <div className='titlebeforecaccauhoithuonggap'>Các câu hỏi thường gặp</div>
                    <div className='contentbeforecaccauhoithuonggap'>
                        Dưới đây là các câu hỏi khách hàng thường thắc mắc , liên hệ trực tiếp trung tâm  để được tư vấn chi tiết hơn .
                    </div>
                </div><br></br><br></br><br></br><br></br>
                <div className='phuhuynh'>
                    <div className='titlecauhoi'>Phụ huynh hỏi đáp</div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state1} onClick={handleAnswer(1)} />
                        <span className='debai' onClick={handleAnswer(1)} >Tại sao tôi phải tìm gia sư tại GiaSuTot ?</span>
                        <div className='answer1' style={{ display: 'none' }}>
                            <ul>
                                <li>Uy tín , nhanh chóng , với cam kết chất lượng</li>
                                <li> Thông tin gia sư rõ ràng , hồ sơ lí lịch đầy đủ</li>
                                <li>Tư vấn nhiệt tình , phục vụ tận tâm</li>
                                <li>Có gia sư từ đủ trình đủ cơ bản tới nâng cao</li>
                                <li>Có gia sư nhanh , 1-2 ngày , cần gấp có thể có trong ngày</li>
                            </ul>
                        </div>
                    </div>
                    {/* ----/------------------------------- */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state2} onClick={handleAnswer(2)}></FontAwesomeIcon>
                        <span className='debai' onClick={handleAnswer(2)}>Tôi có được quyền chọn gia sư ?</span>
                        <div className='answer2' style={{ display: 'none' }}>Anh chị hoàn toàn có thể chọn gia sư theo 2 cách : cách đầu tiên là tham khảo những gia sư do trung tâm giới thiệu qua tư vấn trực tiếp , cách hai là anh chị có thể tự do dựa chọn gia sư <NavLink to='/TinhTu'>tại đây</NavLink>.</div>
                    </div>
                    {/* -------------------------------------------------------- */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state3} onClick={handleAnswer(3)} />
                        <span className='debai' onClick={handleAnswer(3)} >Có phải đóng gì ngoài học phí không ? </span>
                        <div className='answer3' style={{ display: 'none' }}>Không, anh chị không cần đóng gì ngoài học phí , tuy nhiên trong trường hợp cần gia sư gấp trong ngày , anh chị cần trả thêm phí</div>
                    </div>
                    {/* ------------------------------------------------------ */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state4} onClick={handleAnswer(4)} />
                        <span className='debai' onClick={handleAnswer(4)}>Tiền học phí sẽ trả như nào ?</span>
                        <div className='answer4' style={{ display: 'none' }} >Anh chị sẽ không trả học phí cho trung tâm mà học phí sẽ được anh chị và gia sư tự thương lượng , nhưng sẽ có 1 phạm vi thương lượng được cho trước ( ví dụ 200-250k / 2 tiếng /buổi)</div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state5} onClick={handleAnswer(5)} />
                        <span className='debai' onClick={handleAnswer(5)}>Học thử mà không thấy hài lòng về gia sư ?</span>
                        <div className='answer5' style={{ display: 'none' }}> Nếu sau 1-2 buổi học thử  cảm thấy không hài lòng, anh chị có thể đổi gia sư tối đa 4 lần trong 2 tháng kể từ khi kí hợp đồng , nếu sau 4 lần vẫn không hài lòng , anh chị cần trả thêm 1 chút lệ phí để trung tâm hỗ trợ tìm kiếm . </div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state6} onClick={handleAnswer(6)} />
                        <span className='debai' onClick={handleAnswer(6)}>Nhà tôi không có chỗ để học ?</span>
                        <div className='answer6' style={{ display: 'none' }}>Rất tiếc với anh chị , GiaSuTot là trung tâm trung gian chỉ có vai trò trung gian giúp phụ huynh tìm được gia sư như ý , trung tâm rất lấy làm tiếc khi không thể phục vụ được khách hàng trong trường hợp này.</div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state7} onClick={handleAnswer(7)} />
                        <span className='debai' onClick={handleAnswer(7)}>Có phải làm hợp đồng không ?</span>
                        <div className='answer7' style={{ display: 'none' }}>Đa số các gia sư qua làm việc với gia đình phụ huynh học sinh sẽ thỏa thuận miệng thống nhất về thời gian dạy, số buổi , môn học, ngày nhận lương,..</div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state8} onClick={handleAnswer(8)} />
                        <span className='debai' onClick={handleAnswer(8)}>Gia sư có cam kết gì không?</span>
                        <div className='answer8' style={{ display: 'none' }}> Hầu hết các gia sư được trung tâm giới thiệu đều là những gia sư có chất lượng tốt đã qua phỏng vấn sơ tuyển , nhưng do là hình thức 1 kèm 1 nên gia sư không dám đảm bảo 100% các cam kết về điểm số và thành tích cho học sinh trong 1 vài tuần hay 1 vài tháng , nhưng sự nhiệt tình luôn là yếu tố hàng đầu của các gia sư được trung tâm giới thiệu.  </div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state9} onClick={handleAnswer(9)} />
                        <span className='debai' onClick={handleAnswer(9)}>Tôi có bạn muốn học chung thì làm thế nào ?</span>
                        <div className='answer9' style={{ display: 'none' }} > Sau khi giới thiệu gia sư tới học sinh , mọi tình huống như có bạn muốn học thêm đều do gia sư và phụ huynh học sinh tự thỏa thuận , trung tâm không can thiệp. </div>
                    </div><br></br><br></br>
                </div>
                {/* ------------------------------------------------------------------------------------------- */}
                <div className='giasu'>
                    <div className='titlecauhoi'>Gia sư hỏi đáp</div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state10} onClick={handleAnswer(10)} />
                        <span className='debai' onClick={handleAnswer(10)}>Muốn nhận lớp dạy tôi phải làm những gì?</span>
                        <div className='answer10' style={{ display: 'none' }} >Bạn vui lòng bấm <NavLink to="/TuyenDung"> vào đây</NavLink>.</div>
                    </div>
                    {/* ----/------------------------------- */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state11} onClick={handleAnswer(11)} />
                        <span className='debai' onClick={handleAnswer(11)}>Phí để nhận lớp dạy là bao nhiêu ?</span>
                        <div className='answer11' style={{ display: 'none' }}>Phí nhận lớp là 30% với các lớp thường, còn các lớp Ngoại ngữ cho người đi làm là 25% mức lương 1 tháng. Gia sư chỉ phải đóng phí 1 lần lúc làm hợp đồng nhận lớp. Với 1 số lớp ôn thi, học ngắn hạn sẽ giảm phí xuống</div>
                    </div>
                    {/* -------------------------------------------------------- */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state12} onClick={handleAnswer(12)} />
                        <span className='debai' onClick={handleAnswer(12)}>Tôi có thể tìm học viên với những tiêu chí riêng của bản thân bằng cách nào? </span>
                        <div className='answer12' style={{ display: 'none' }}>Bạn có thể liên hệ trực tiếp trung tâm để được nhân viên hỗ trợ gửi bạn danh sách các phụ huynh học sinh đang tìm gia sư cho con , ngoài ra bạn có thể hoàn thiện hồ sơ bản thân bằng cách <NavLink to="#"> đăng kí</NavLink> một tài khoản GiaSuTot và đăng các video giới thiệu bản thân và sở trường của bản thân như chất giọng gia sư ấm áp , truyền đạt kiến thức có hệ thống , ... qua đó phụ huynh có thể quan sát và trong trường hợp ưng ý phụ huynh sẽ liên hệ bạn. </div>
                    </div>
                    {/* ------------------------------------------------------ */}
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state13} onClick={handleAnswer(13)} />
                        <span className='debai' onClick={handleAnswer(13)}>Hiện giờ tôi chưa đủ tiền để nhận lớp?</span>
                        <div className='answer13' style={{ display: 'none' }}>Trong trường hợp này GiaSuTot sẽ có phương pháp hỗ trợ tài chính cho gia sư , nhằm đảm bảo gia sư nhận được lớp như ý .</div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state14} onClick={handleAnswer(14)} />
                        <span className='debai' onClick={handleAnswer(14)}>Trung tâm có hỗ trợ tài liệu học tập không ?</span>
                        <div className='answer14' style={{ display: 'none' }}> Có , bạn liên hệ với trung tâm để được nhân viên hỗ trợ gửi bạn tài liệu. </div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state15} onClick={handleAnswer(15)} />
                        <span className='debai' onClick={handleAnswer(15)}>Lợi ích của việc tích lũy nhiều điểm ưu tú ?</span>
                        <div className='answer15' style={{ display: 'none' }}> Khi sở hữu nhiều điểm ưu tú , trong những lần tìm gia sư tiếp theo bạn sẽ được xếp ưu tiên đầu danh sách tìm kiếm khi phụ huynh tìm kiếm , qua đó gia tăng cơ hội và sự uy tín của bạn. </div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state16} onClick={handleAnswer(16)} />
                        <span className='debai' onClick={handleAnswer(16)}>Nhà ở xa không qua được trung tâm phải làm sao?</span>
                        <div className='answer16' style={{ display: 'none' }}>Trung tâm có hỗ trợ phỏng vấn online và làm hợp đồng online ,nộp lệ phí sẽ được nhân viên hỗ trợ làm việc và hướng dẫn bạn( thường sẽ qua chuyển khoản ngân hàng ) </div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state17} onClick={handleAnswer(17)} />
                        <span className='debai' onClick={handleAnswer(17)}>Trường hợp nào được hoàn phí ?</span>
                        <div className='answer17' style={{ display: 'none' }}>Gia sư được hoàn phí trong trường hợp phụ huynh học sinh có lí do chính đáng : chuyển nơi ở , tìm được gia sư rồi ,gia đình phụ huynh học sinh đe dọa sức khỏe , ... trong thời gian 3 tháng kể từ khi kí hợp đồng , gia sư vui lòng đọc chi tiết hơn trong hợp đồng.</div>
                    </div>
                    <div className='cauhoi'>
                        <FontAwesomeIcon style={{ paddingRight: "20px", transform: "scale(1.3)" }} icon={state18} onClick={handleAnswer(18)} />
                        <span className='debai' onClick={handleAnswer(18)}>Tôi muốn tham khảo hợp đồng nhận lớp?</span>
                        <div className='answer18' style={{ display: 'none' }}> Bạn tham khảo hợp đồng nhận lớp <NavLink>tại đây</NavLink></div>
                    </div><br></br>
                </div>
            </div >
        </>
    );
}
export default HoiDap;