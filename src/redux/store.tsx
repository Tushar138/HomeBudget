import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

const store:any=configureStore({
    reducer: rootReducer
})

export default store;