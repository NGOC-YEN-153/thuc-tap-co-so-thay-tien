import "./ThoiGianRanhModal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { filterActions } from '../../Reducers/FilterReducer';
import { IsActiveActions } from "../../Reducers/IsActiveReducer";
import { FcClock } from "react-icons/fc";

import CheckBoxInput from "../CheckBoxInput";
function ThoiGianRanhModal() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const handleComplete = () => {
        dispatch(IsActiveActions.changeStatusFilter(true));
        dispatch(IsActiveActions.changeStatusListTutors(true));
        dispatch(IsActiveActions.changeStatusChanTrang(true));
        dispatch(IsActiveActions.changeStatusTitle(true));
        dispatch(IsActiveActions.changeStatusThoiGianRanh(false));
        dispatch(filterActions.selectThoiGian('Đã chọn thời gian'));
    }
    const handleClearAll = () => {
        dispatch(IsActiveActions.changeStatusDataThoiGianRanh({ clear: true }));
    }
    const handleSelectAll = () => {
        dispatch(IsActiveActions.changeStatusDataThoiGianRanh({ clear: false }));
    }
    const handleX = () => {
        dispatch(IsActiveActions.changeStatusFilter(true));
        dispatch(IsActiveActions.changeStatusListTutors(true));
        dispatch(IsActiveActions.changeStatusChanTrang(true));
        dispatch(IsActiveActions.changeStatusTitle(true));
        dispatch(IsActiveActions.changeStatusThoiGianRanh(false));
    }
    const handleMouseOver = (e) => {
        const class_ = e.target.classList.value;
        // 211
        if (class_[1] !== '1') {
            if (class_.slice(2, 4) !== '00') {
                const toadoi = parseInt(class_[1]);
                const toadoj = parseInt(class_.slice(2, 4));
                for (let j = 0; j <= toadoj; j++) {
                    const foo = `.a${class_[1]}${String(j).padStart(2, '0')}`;
                    document.querySelector(foo).style.backgroundColor = '#28a745';
                }

                for (let i = 1; i <= toadoi; i++) {
                    const foo = `.a${i}${class_.slice(2, 4)}`;
                    document.querySelector(foo).style.backgroundColor = '#28a745';
                }
            }
        }
    }
    const handleMouseOut = (e) => {
        const class_ = e.target.classList.value;
        if (class_[1] !== '1') {
            if (class_.slice(2, 4) !== '00') {
                const toadoi = parseInt(class_[1]);
                const toadoj = parseInt(class_.slice(2, 4));
                for (let j = 0; j <= toadoj; j++) {
                    const foo = `.a${class_[1]}${String(j).padStart(2, '0')}`;
                    document.querySelector(foo).style.backgroundColor = 'white';
                }

                for (let i = 1; i <= toadoi; i++) {
                    const foo = `.a${i}${class_.slice(2, 4)}`;
                    document.querySelector(foo).style.backgroundColor = 'white';
                }
            }
        }
    }
    if (!state.isActiveThoiGianRanh) return <></>;
    return (
        <>
            <div className="thoi-gian-ranh">
                <div className="select-time-title"> <FcClock /> Chọn thời gian quý phụ huynh muốn gia sư cho con ! </div>
                <table className="thoi-gian-ranh-modal">
                    <thead>
                        <tr>
                            <th className={('a100')} style={{ border: "#cccccc solid 1px" }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Thứ/Giờ</th>
                            {
                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(value => {
                                    return <th className={('a1' + String((value + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >{String(value).padStart(2, '0')}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t2">
                            <td className={('a200')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 2</td>
                            {
                                (state.DataThoiGianRanh)[2].map((value, index) => {
                                    return <td className={('a2' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 2, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t3">
                            <td className={('a300')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 3</td>
                            {
                                state.DataThoiGianRanh[3].map((value, index) => {
                                    return <td className={('a3' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 3, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t4">
                            <td className={('a400')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 4</td>
                            {
                                state.DataThoiGianRanh[4].map((value, index) => {
                                    return <td className={('a4' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 4, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t5">
                            <td className={('a500')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 5</td>
                            {
                                state.DataThoiGianRanh[5].map((value, index) => {
                                    return <td className={('a5' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 5, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t6">
                            <td className={('a600')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 6</td>
                            {
                                state.DataThoiGianRanh[6].map((value, index) => {
                                    return <td className={('a6' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 6, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t7">
                            <td className={('a700')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >Thứ 7</td>
                            {
                                state.DataThoiGianRanh[7].map((value, index) => {
                                    return <td className={('a7' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 7, hour: index }} /></td>
                                })
                            }
                        </tr>
                        <tr className="t8">
                            <td className={('a800')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>CN</td>
                            {
                                state.DataThoiGianRanh[8].map((value, index) => {
                                    return <td className={('a8' + String((index + 1)).padStart(2, '0'))} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><CheckBoxInput isVisual={value} DataThoiGianRanh={{ day: 8, hour: index }} /></td>
                                })
                            }
                        </tr>
                    </tbody>
                </table>

                <button
                    className="completed"
                    onClick={handleComplete}
                    style={{ zIndex: 1000 }}
                >
                    Hoàn thành
                </button>
                <button
                    className="clearAll"
                    onClick={handleClearAll}
                    style={{ zIndex: 1000 }}
                >
                    Xóa hết lựa chọn
                </button>

                <button
                    className="selectAll"
                    onClick={handleSelectAll}
                    style={{ zIndex: 1000 }}
                >
                    Chọn tất cả
                </button>
                <FontAwesomeIcon icon={faTimesCircle} className="x" onClick={handleX} />
            </div>
        </>
    );
}
export default ThoiGianRanhModal;