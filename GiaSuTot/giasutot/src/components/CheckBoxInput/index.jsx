import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from "../../Reducers/IsActiveReducer";
function CheckBoxInput(props) {
    const dispatch = useDispatch();
    return (
        <input
            type="checkbox"
            checked={props.isVisual}
            onChange={() => dispatch(IsActiveActions.changeStatusDataThoiGianRanh({ day: props.DataThoiGianRanh.day, hour: props.DataThoiGianRanh.hour }))}
            style={{ height: '15px' }}
        >
        </input>

    );
}
export default CheckBoxInput;