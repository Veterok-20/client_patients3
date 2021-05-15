import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPatients, selectAllPatients, selectError, selectStatus } from "../features/patients/patientsSlice"
import { PatientDTO, MapArrayToJSX } from "../types"
import PatientComponent from "./PatientComponent"

export default function PatientsList() {    
    const dispatch = useDispatch()
    const patients = useSelector(selectAllPatients)
    const patientsStatus = useSelector(selectStatus)
    const error = useSelector(selectError)

    useEffect(() => {
        if (patientsStatus === 'idle') {
           dispatch(fetchPatients())
        }       
    }, [patientsStatus, dispatch])
    

    const mapCallback: MapArrayToJSX<PatientDTO> = (patient) => {
        return <PatientComponent
            key={patient.id}
            patient={patient}
        />
    }

    if (patientsStatus === 'failed') {
        return <p>{error}</p>}
        
    return (
        <ul>
            {patients.map(mapCallback)}
        </ul>
    )
}
// if (patientsStatus === 'loading') {
//     return <  />
// } else if (patientsStatus === 'succeeded') {
//     return (
//         <List component="ul">
//             {patients.map(mapCallback)}
//         </List>
//     )
// } else if (patientsStatus === 'failed') {
//     return <Alert severity="error">{error}</Alert>
// } else {
//     return null
// }
