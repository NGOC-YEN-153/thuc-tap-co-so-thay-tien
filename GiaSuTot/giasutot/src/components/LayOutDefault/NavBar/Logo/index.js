import { NavLink } from "react-router-dom";
import "./Logo.css"
import 'bootstrap/dist/css/bootstrap.min.css';
function Logo() {
    return (
        <>
            <NavLink to="#Logo">
                <span className="logo">GiaSuTot</span>
            </NavLink>
        </>
    );
}
export default Logo;