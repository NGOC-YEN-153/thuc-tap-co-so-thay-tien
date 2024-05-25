import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { IsActiveActions } from "../../Reducers/IsActiveReducer";
import { getCookie } from "../Cookies";
import fetchGet from "../../Fetch/fetchGet";
function LayOutDefault() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    // display : 'flex' , flexDirection : 'column' , flexWrap : 'wrap'
    const loc = useLocation();
    useEffect(() => {
        console.log('layout render');
        (
            async () => {
                const token = getCookie('token');
                if (!token) {
                    dispatch(IsActiveActions.changeStatusUser(null));
                }
                else {
                    // getInfoCookies
                    // const users = await fetchGet(`http://localhost:8888/user/getUserInfo?userId=${state.user?.userId}`);
                    const users = await fetchGet(`http://localhost:8888/user/getInfoCookies`);
                    if (users?.message) {
                        // do nothing
                    }
                    else {
                        dispatch(IsActiveActions.changeStatusUser(users));
                    }
                }
                window.scrollTo(0, 0);
            }
        )();
    }, [loc]);
    return (
        <>
            <div className="layoutf" style={{ backgroundColor: "#f6fcff" }}>
                {state.user ? <NavBar /> : <NavBar />}
                {
                    state.isActiveBodyFooter ? <><Outlet /> <Footer /></> : <></>
                }
            </div>

        </>
    );
}
export default LayOutDefault;