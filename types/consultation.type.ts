"data"
import { ApiResponse } from "./auth.type"
import { Encounter } from "./encounters.type"


export type Doctor = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    email_verified_at: string
    is_active: boolean,
    joined_at: string
    created_at: string
    updated_at: string
}
export type Consultation = {
    id: number
    encounter_id: number
    doctor_id: number
    subjective: string | null
    objective: string | null,
    assessment: string | null,
    plan: string | null,
    status: string
    started_at: string | null
    completed_at: string | null
    created_at: string | null
    updated_at: string | null
    encounter: Encounter & { deleted_at: string | null }
    doctor: Doctor

}

export type GetAllConsultations = ApiResponse<Consultation[]>
export type GetSingleConsultation = ApiResponse<Consultation>
export type StartConsultationRequest = {
    encounter_id: number
} 
export type StartConsultationResponse = ApiResponse<Omit<Consultation, 'encounter' | 'doctor'>>
export type UpdateConsultationRequest = Pick<Consultation, 'subjective' | 'objective' | 'assessment' | 'plan'>
export type UpdateConsultationResponse = StartConsultationResponse
export type CompleteConsuultationResponse = StartConsultationResponse
export type CancelConsultationResponse = StartConsultationResponse