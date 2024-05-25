import "./Filter.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../Reducers/FilterReducer";
import { IsActiveActions, IsActiveReduce } from "../../Reducers/IsActiveReducer";
import fetchGet from "../../Fetch/fetchGet";
import { useLocation } from "react-router-dom";
function Filter() {
    const state1 = useSelector(state => state.IsActiveReduce);
    const state2 = useSelector(state => state.filterReduce);
    const dispatch = useDispatch();
    const [Mons, setMons] = useState([]);
    const [Lops, setLops] = useState([]);
    const [city, setCity] = useState([]);
    const [listHuyen, setListHuyen] = useState([]);
    const [listXa, setListXa] = useState([]);
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
    let exp = 1;
    if (state2.kinhNghiem === 'Kinh Nghiệm') exp = 'Kinh Nghiệm';
    if (state2.kinhNghiem === 'Bất kì') exp = 'Bất kì';
    if (state2.kinhNghiem === 0.5) exp = 'Dưới 1 năm';
    if (state2.kinhNghiem === 1.5) exp = '1 - 2 năm';
    if (state2.kinhNghiem === 2) exp = 'Trên 2 năm';
    if (state2.kinhNghiem === 5) exp = 'Trên 5 năm';

    const [DataThoiGianRanh, mon, lop, thanhPho, huyen, xa, gioiTinh, kinhNghiem] = [state1?.DataThoiGianRanh, state2?.monHoc, state2?.lop, state2?.thanhPho, state2?.huyen, state2?.xa, state2?.gioiTinh, state2?.kinhNghiem];
    const handleFilterAction = () => {
        const fetchData = async () => {
            try {
                const dataListTutors = await fetchGet('http://localhost:8888/guest/filter', { DataThoiGianRanh, mon, lop, thanhPho, huyen, xa, gioiTinh, kinhNghiem });
                dispatch(IsActiveActions.changeStatusListTutors(true))
                dispatch(IsActiveActions.changeStatusTinhTuers(dataListTutors));
            } catch (error) {
                throw new Error(error);
            }
        }
        if (!state1.isActiveFilterChild1) {
            dispatch(IsActiveActions.changeStatusFilterChild1(true));
            dispatch(filterActions.selectBoLoc('Lọc'));
        }
        else {
            setTimeout(() => {
                dispatch(IsActiveActions.changeStatusTinhTuers([]));

            }, 0);
            setTimeout(() => {
                fetchData();
            }, 500);
        }
    }
    const handleMon = (mon) => {
        return () => {
            dispatch(filterActions.selectMon(mon));
        }
    }
    const handleLop = (lop) => {
        return () => {
            dispatch(filterActions.selectLop(lop));
        }
    }
    const handleThanhPho = (city) => {
        if (city === 'Bất kì') {
            return () => {
                dispatch(filterActions.selectThanhPho(city));
                dispatch(filterActions.selectHuyen('Bất kì'));
                dispatch(filterActions.selectXa('Bất kì'));
                const nodelist = document.querySelector(`.huyen .dropdown-menu`).children;
                [...nodelist].forEach(item => {
                    if (!item.classList.contains(md5(city))) item.style.display = 'none';
                    else item.style.display = 'block';
                })
            }
        }
        return () => {
            dispatch(filterActions.selectThanhPho(city));
            dispatch(filterActions.selectHuyen('Huyện'));
            dispatch(filterActions.selectXa('Xã'));
            const nodelist = document.querySelector(`.huyen .dropdown-menu`).children;
            [...nodelist].forEach(item => {
                if (!item.classList.contains(md5(city))) item.style.display = 'none';
                else item.style.display = 'block';
            })
        }
    }
    const handleHuyen = (huyen) => {
        return () => {
            dispatch(filterActions.selectHuyen(huyen));
            dispatch(filterActions.selectXa('Xã'));
            const nodelist = document.querySelector(`.xa .dropdown-menu`).children;
            [...nodelist].forEach(item => {
                if (!item.classList.contains(md5(huyen))) item.style.display = 'none';
                else item.style.display = 'block';
            })
        }
    }
    const handleXa = (xa) => {
        return () => {
            dispatch(filterActions.selectXa(xa));
        }
    }
    const handleGioiTinh = (gioiTinh) => {
        return () => {
            dispatch(filterActions.selectGioiTinh(gioiTinh));
        }
    }
    const handleKinhNghiem = (year) => {
        return () => {
            dispatch(filterActions.selectKinhNghiem(year));
        }
    }
    const handleThoiGian = () => {
        dispatch(IsActiveActions.changeStatusFilter(false));
        dispatch(IsActiveActions.changeStatusListTutors(false));
        dispatch(IsActiveActions.changeStatusChanTrang(false));
        dispatch(IsActiveActions.changeStatusTitle(false));
        dispatch(IsActiveActions.changeStatusThoiGianRanh(true));
    }
    if (!state1.isActiveFilter) return <></>
    return (
        <div className="filter">
            {
                !state1.isActiveFilterChild1 ? <></> :
                    <>
                        <div className="dropdown mon">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2.monHoc}
                            </button>
                            <div className="dropdown-menu scrollable-dropdown dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    Mons?.map((mon, index) => {
                                        return <a className="dropdown-item" href="#" onClick={handleMon(mon?.name)}>{mon?.name}</a>

                                    })
                                }

                            </div>
                        </div>
                        {/* ----------------------------------------------------------------------- */}
                        <div className="dropdown lop">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2.lop}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {/* <a className="dropdown-item" href="#" onClick={handleLop("1")}>1</a>
                                <a className="dropdown-item" href="#" onClick={handleLop("2")}>2</a>
                                <a className="dropdown-item" href="#" onClick={handleLop("3")}>3</a> */}
                                {
                                    Lops?.map((lop, index) => {
                                        return <a className="dropdown-item" href="#" onClick={handleLop(lop?.name)}>{lop?.name}</a>

                                    })
                                }
                            </div>
                        </div>
                        {/* ---------------------------------------------------- */}
                        <div className="dropdown thanh-pho">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2.thanhPho}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                {
                                    city?.map((item, index) => {
                                        return (
                                            <a className="dropdown-item" href="#" onClick={handleThanhPho(item)}>
                                                {item}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* ------------------------------------------------------------- */}
                        <div className="dropdown huyen">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2.huyen}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                <a className={`dropdown-item`} href="#">
                                    Bạn chưa chọn thành phố
                                </a>
                                {
                                    listHuyen?.map((item, index) => {
                                        return (
                                            <a className={`dropdown-item ${md5(item.parent)}`} href="#" onClick={handleHuyen(item.name)} style={{ display: 'none' }}>
                                                {item.name}
                                            </a>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        {/* ------------------------------------------------------------------------ */}
                        <div className="dropdown xa">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2?.xa}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                <a className={`dropdown-item`} href="#">
                                    Bạn chưa chọn huyện
                                </a>
                                {
                                    listXa?.map((item, index) => {
                                        return (
                                            <a className={`dropdown-item ${md5(item.parent)}`} href="#" onClick={handleXa(item.name)} style={{ display: 'none' }}>
                                                {item.name}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* ------------------------------------------------------------- */}
                        <div className="dropdown gioi-tinh">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {state2?.gioiTinh}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={handleGioiTinh('Nam')}>
                                    Nam
                                </a>
                                <a className="dropdown-item" href="#" onClick={handleGioiTinh('Nữ')}>
                                    Nữ
                                </a>
                            </div>
                        </div>
                        {/* ------------------------------------------------------------------------ */}
                        <div className="thoi-gian">
                            <button
                                className="thoi-gian-button"
                                onClick={handleThoiGian}
                            >
                                {state2?.thoiGian} <FontAwesomeIcon icon={faCaretDown} id='fa-caret-downn' />
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton" style={{ opacity: 0 }}></div>
                        </div>
                        {/* ------------------------------------------------------ */}
                        <div className="dropdown kinh-nghiem">
                            <button
                                className="btn btn-outline-secondary btn-sm btn-sm dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {exp}
                            </button>
                            <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={handleKinhNghiem(0.5)}>
                                    dưới 1 năm
                                </a>
                                <a className="dropdown-item" href="#" onClick={handleKinhNghiem(1.5)}>
                                    1-2 năm
                                </a>
                                <a className="dropdown-item" href="#" onClick={handleKinhNghiem(2)}>
                                    trên 2 năm
                                </a>
                                <a className="dropdown-item" href="#" onClick={handleKinhNghiem(5)}>
                                    trên 5 năm
                                </a>
                                <a className="dropdown-item" href="#" onClick={handleKinhNghiem('Bất kì')}>
                                    Bất kì
                                </a>
                            </div>
                        </div>
                    </>
            }
            <button onClick={handleFilterAction} className="btn btn-success btn-sm loc"><FontAwesomeIcon icon={faFilter} /> {state2.locOrBoLoc}</button>
            {/* -------------------------------------------------------------------------- */}
        </div >
    );
}
export default Filter;