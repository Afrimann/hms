import { ApiResponse } from "./auth.type";
import { Paginated } from "./notifications.types";

export type Gender = "male" | "female" | "other";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Genotype = "AA" | "AS" | "SS" | "AC" | "SC";
export type MaritalStatus = "single" | "married" | "divorced" | "widowed";

export type NextOfKin = {
    name: string;
    phone: string;
    relationship: string;
};

export type Patient = {
    id: number;
    patient_number: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    full_name: string;
    gender: Gender;
    age: number;
    date_of_birth: string;
    phone: string;
    email?: string;
    address?: string;
    marital_status?: MaritalStatus;
    occupation?: string;
    blood_group?: BloodGroup;
    genotype?: Genotype;
    allergies?: string;
    next_of_kin: NextOfKin;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type CreatePatientPayload = {
    first_name: string;
    last_name: string;
    middle_name?: string;
    gender: Gender;
    date_of_birth: string;
    phone: string;
    email?: string;
    address?: string;
    marital_status?: MaritalStatus;
    occupation?: string;
    blood_group?: BloodGroup;
    genotype?: Genotype;
    allergies?: string;
    next_of_kin_name?: string;
    next_of_kin_phone?: string;
    next_of_kin_relationship?: string;
};

export type UpdatePatientPayload = Partial<CreatePatientPayload>;
export type SearchPatientsRequest = { search: string };

export type CreatePatientResponse = ApiResponse<Patient>;
export type UpdatePatientResponse = ApiResponse<Patient>;
export type GetPatientByIdResponse = ApiResponse<Patient>;
export type GetPatientsResponse = ApiResponse<Paginated<Patient>>;
export type SearchPatientsResponse = ApiResponse<Paginated<Patient>>;