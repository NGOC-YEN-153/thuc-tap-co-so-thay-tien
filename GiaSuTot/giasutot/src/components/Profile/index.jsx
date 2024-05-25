import { NavLink } from 'react-router-dom';
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { useEffect, useState } from 'react';
import fetchGet from '../../Fetch/fetchGet';
const Profile = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const handle = () => {
        dispatch(IsActiveActions.changeStatusProfileModal(!state.isActiveProfileModal));
    }
    useEffect(() => {
        console.log('profile render');
    }, []);
    return (
        <img onClick={handle} className="avatar-profile" src={state.user?.linkAvatar} alt='avatar'></img>
    );
}
export default Profile;