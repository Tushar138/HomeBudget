import { combineReducers } from "redux";
import { budgetReducer } from "./budgetReducer";
export const rootReducer=combineReducers({
    budgetReducer,
})