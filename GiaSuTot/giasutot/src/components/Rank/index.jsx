import './Rank.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { FaXmark } from "react-icons/fa6";
import { faEllipsisH, faThumbsUp, faThumbsDown, faGlobe, faLock, faStar } from '@fortawesome/free-solid-svg-icons';
import { AiFillDislike } from "react-icons/ai";
import { FaGlobeAsia, FaSync } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import { GoLog } from "react-icons/go";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { PiArticleThin } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import fetchGet from '../../Fetch/fetchGet';
import { SiCodeforces } from "react-icons/si";
import { makeAward, makeColor, quyVeHangNghin } from '../../Award';

const makeDay = (Day) => {
    console.log(typeof (Day))
    // Lấy ngày
    const day = Number(Day.slice(5, 7));

    // Lấy tháng (lưu ý rằng tháng trong JavaScript được đếm từ 0)
    const month = Number(Day.slice(8, 10));


    return day + ' tháng ' + month;
}
const Rank = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const parameter = queryString.parse(window.location.search);
    const loc = useLocation();
    const [ranks, setRank] = useState([]);
    useEffect(() => {
        (
            async () => {
                const data = await fetchGet('http://localhost:8888/guest/rank');
                setRank(data);
                window.scrollTo(0, 0);
                try {
                    if(document.querySelector('.bxhh')) document.querySelector('.bxhh').style.border = '1px solid white';
                    if(document.querySelector('.trangchuu'))document.querySelector('.trangchuu').style.border = '1px solid #0693e3';
                    if(document.querySelector('.tinhtuu'))document.querySelector('.tinhtuu').style.border = '1px solid #0693e3';
                    if(document.querySelector('.timgiasuu'))document.querySelector('.timgiasuu').style.border = '1px solid #0693e3';
                    if(document.querySelector('.timhocvienn'))document.querySelector('.timhocvienn').style.border = '1px solid #0693e3';
                    if(document.querySelector('.hoidapp'))document.querySelector('.hoidapp').style.border = '1px solid #0693e3';
                } catch (error) {

                }
            }
        )();
    }, [loc]);
    return (
        <div className='rank'>
            <div className='title'>
                <SiCodeforces />  Bảng xếp hạng gia sư danh dự
            </div>
            <table className="table table-striped sta">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', backgroundColor: '#0693e3', color: 'white' }} scope="col"></th>
                        <th scope="col" style={{ textAlign: 'center', backgroundColor: '#0693e3', color: 'white' }} >Gia sư</th>
                        <th scope="col" style={{ textAlign: 'center', backgroundColor: '#0693e3', color: 'white' }}>Danh hiệu</th>
                        <th scope="col" style={{ textAlign: 'center', backgroundColor: '#0693e3', color: 'white' }}> Rating</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        ranks?.map((rank, index) => {
                            return (
                                <tr>
                                    <th scope="row">#{index + 1}</th>
                                    <th style={{ paddingLeft: '25px' }} scope="row"><span><img className='small-avatarr' src={rank.linkAvatar} alt="avt" /> <span style={{ color: makeColor(rank?.star || 0), marginLeft: '15px' }}>{rank.name}</span></span></th>
                                    <th scope="row" > <img className='small-avatarrr com' src={rank.rankImage} alt="rank" /> <span className='com cx' style={{ color: makeColor(rank?.star || 0) }}>{makeAward(rank?.star)}</span></th>
                                    <th scope="row"><span> <span className='com'>{quyVeHangNghin(rank.star)} k </span> <FontAwesomeIcon className='com' style={{ color: '#0693e3' }} icon={faStar} />   </span></th>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
// flex wrap tự độn xuoogns dòng
export default Rank;
