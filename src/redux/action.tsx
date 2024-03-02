import AsyncStorage from "@react-native-async-storage/async-storage";
import { Budget } from "../models/Budget";
import { constants } from "./constants";

export const saveBudgetEntry=(payload:Budget)=>{
    return {
        type: constants.SAVE_BUDGET_ENTRY,
        payload,
    }
}

export const setInitialBudgetEntries = (entries: Budget[]) => ({
    type: constants.INITIAL_BUDGET_ENTRIES,
    payload: entries,
  });

