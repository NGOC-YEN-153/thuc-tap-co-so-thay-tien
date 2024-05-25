import "./TinhTu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from '../../Reducers/FilterReducer';
import { IsActiveActions, isActiveActions } from '../../Reducers/IsActiveReducer';
import ThoiGianRanhModal from "../ThoiGianRanhModal";
import ListTutors from "../ListTutors";
import Filter from "../Filter/Filter";
import Title from "../Title";
import { useLocation } from "react-router-dom";
function TinhTu() {
    const loc = useLocation();
    useEffect(() => {
        console.log("Tinhtu render ");
        window.scrollTo(0, 0);
        try {
            if(document.querySelector('.tinhtuu'))document.querySelector('.tinhtuu').style.border = '1px solid white';
            if(document.querySelector('.trangchuu'))document.querySelector('.trangchuu').style.border = '1px solid #0693e3';
            if(document.querySelector('.bxhh'))document.querySelector('.bxhh').style.border = '1px solid #0693e3';
            if(document.querySelector('.timgiasuu'))document.querySelector('.timgiasuu').style.border = '1px solid #0693e3';
            if(document.querySelector('.timhocvienn'))document.querySelector('.timhocvienn').style.border = '1px solid #0693e3';
            if(document.querySelector('.hoidapp'))document.querySelector('.hoidapp').style.border = '1px solid #0693e3';
        } catch (error) {

        }

    }, [loc]);
    return (
        <>

            <Title />
            <Filter />
            <ListTutors />
            <ThoiGianRanhModal />
        </>
    );
}

export default TinhTu;
// tại sao query body