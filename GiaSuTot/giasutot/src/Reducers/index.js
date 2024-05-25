import { combineReducers } from "redux";
import { filterReduce } from "./FilterReducer";
import { IsActiveReduce } from "./IsActiveReducer";
const allReducers = combineReducers({
    filterReduce: filterReduce.reducer,
    IsActiveReduce: IsActiveReduce.reducer
    // thêm reducer
})
export default allReducers;