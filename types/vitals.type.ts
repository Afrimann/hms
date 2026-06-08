
import { ApiResponse } from "./auth.type";
import {  PatientRef } from "./encounters.type";

type  EncounterRef = {
    id: number;
    encounter_number: string;
    status: string;
};
type RecordedBy = {
    id: number;
    name: string;
};
export type ConsciousnessLevel = "alert" | "verbal" | "pain" | "unresponsive";
export type CreateVitalsRequest = {
    encounter_id: number;
    temperature_c?: number;
    pulse_rate?: number;
    respiratory_rate?: number;
    systolic_bp?: number;
    diastolic_bp?: number;
    oxygen_saturation?: number;
    blood_glucose?: number;
    weight_kg?: number;
    height_cm?: number;
    pain_score?: number;
    consciousness_level?: ConsciousnessLevel;
    notes?: string;
};

export type UpdateVitalsRequest = Partial<CreateVitalsRequest>;
export type Vitals = {
    id: number;
    encounter: EncounterRef;
    patient: PatientRef;
    temperature_c: string | null;
    pulse_rate: number | null;
    respiratory_rate: number | null;
    systolic_bp: number | null;
    diastolic_bp: number | null;
    oxygen_saturation: number | null;
    blood_glucose: string | null;
    weight_kg: string | null;
    height_cm: string | null;
    bmi: string | null;
    pain_score: number | null;
    consciousness_level: ConsciousnessLevel | null;
    notes: string | null;
    recorded_by: RecordedBy;
    recorded_at: string;
    created_at: string;
    updated_at: string;
}


export type ShowVitalsResponse = ApiResponse<Vitals>;
export type ListVitalsResponse = ApiResponse<Vitals[]>;
export type UpdateVitalsResponse = ApiResponse<Vitals>;