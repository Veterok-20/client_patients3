export type Patient = {
    LastName: string
    Name: string
    Patronymic: string
    Diagnosis: string
}

export type PatientDTO = Patient & {
    id: number
}

export type MapArrayToJSX<T> = {
    (el: T, index?: number): JSX.Element
} 