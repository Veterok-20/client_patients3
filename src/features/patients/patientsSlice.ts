import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Patient, PatientDTO } from "../../types";


interface PatientsState {
    status: string
    error: null | string | undefined
    patients: PatientDTO[]
}

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async function () {
    const response = await fetch('/api/patients')
    if (response.ok) {
        const patientsFromServer: PatientDTO[] = await response.json();
        return patientsFromServer
    }
    else throw new Error('Response is not ok')
})

export const createPatient = createAsyncThunk('patients/createPatient', async function(newPatient: Patient) {
    const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatient)
    })
    if (response.ok) {
        const patientFromServer: PatientDTO = await response.json();
        return patientFromServer
    }
    else throw new Error('Response is not ok')
})

export const removePatient = createAsyncThunk('patients/removePatient', async function(id: number) {
    const response = await fetch(`/api/patient/${id}`, {
        method: 'DELETE'
    })        
    if (response.ok) {
        return id
    }
    else throw new Error('Response is not ok')
})

export const updatePatient = createAsyncThunk('patients/updatePatient', async function(updatedPatient: PatientDTO) {
    const response = await fetch(`/api/patient/${updatedPatient.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPatient)
    })
    if (response.ok) {        
        return updatedPatient
    }
    else throw new Error('Response is not ok')
})


export const patientsSlice = createSlice({
    name: 'patients',
    initialState: {
        status: 'idle',
        error: null,
        patients: []        
    } as PatientsState,
    reducers: {
        // taskAdded(state, action: PayloadAction<TaskDTO>) {
        //     state.tasks.push(action.payload)
        // }
    },
    extraReducers: builder => {
        builder.addCase(fetchPatients.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPatients.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.patients = state.patients.concat(action.payload)
        })
        builder.addCase(fetchPatients.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    //     builder.addCase(createTask.fulfilled, (state, action) => {
    //         state.tasks.push(action.payload)
    //     })
    //     builder.addCase(removeTask.fulfilled, (state, action) => {
    //         const newTasks = state.tasks.filter(task => task.id !== action.payload)
    //         return {...state, tasks: newTasks} 
    //     })
    //     builder.addCase(updateTask.fulfilled, (state, action) => {
    //         const updatedTask = state.tasks.find((task) => task.id == action.payload.id)!
    //         updatedTask.completed = action.payload.completed
    //         updatedTask.text = action.payload.text
    //     })
    }
})

export default patientsSlice.reducer

export const selectAllPatients = (state: RootState) => state.patients.patients

export const selectStatus = (state: RootState) => state.patients.status

export const selectError = (state: RootState) => state.patients.error