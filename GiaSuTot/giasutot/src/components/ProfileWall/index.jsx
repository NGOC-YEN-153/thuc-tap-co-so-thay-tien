import './ProfileWall.css';
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
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import Introduction from './Introduction';
import Articles from './Articles';
import Assessment from './Assessment';
const ProfileWall = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);

    return (
        <div className='profile-wall'>
            <Introduction /> 
            <Assessment /> 
             <Articles />

        </div>
    );
}
// flex wrap tự độn xuoogns dòng
export default ProfileWall;