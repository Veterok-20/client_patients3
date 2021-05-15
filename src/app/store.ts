import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patients/patientsSlice";

const store = configureStore({
    reducer: {
        patients: patientsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store