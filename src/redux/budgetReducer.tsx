import AsyncStorage from "@react-native-async-storage/async-storage"
import { Budget } from "../models/Budget"
import { constants } from "./constants";

const initialState: Budget[]=[];

export const budgetReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case constants.INITIAL_BUDGET_ENTRIES:{
            return action.payload;
        }
        case constants.SAVE_BUDGET_ENTRY: {
            
            return [... state, action.payload];
        }
        default: 
                return state;
    }
}