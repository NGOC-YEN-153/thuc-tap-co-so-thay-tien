import Logo from "./Logo";
import Navigate from "./Navigate";
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneVolume } from "react-icons/fa6";
import { useSelector } from "react-redux";

function NavBar() {
    const state = useSelector(state => state.IsActiveReduce);
    return (
        <>
            <div className="NavBarr">
                <Logo />
            {state?.user?.role !==3 ? < FaPhoneVolume  className = 'contact'/> : <></>}
                <Navigate />
            </div>
        </>
    );
}
export default NavBar;