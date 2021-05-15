import React from "react"
import { PatientDTO } from "../types"

type PatientProps = {
    patient: PatientDTO
  }
  export default function PatientComponent({ patient }: PatientProps) {    
  
    return (
      <>
        <p>{patient.LastName}{patient.Name}{patient.Patronymic}-{patient.Diagnosis}</p>
        <button>Edit</button>
        <button>Delete</button>
      </>
    )
  }