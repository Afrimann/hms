import { ApiResponse } from "./auth.type";

type ResourceRef = { id: number; name: string };
export type EncounterRef = { id: number; encounter_number: string };
export type PatientRef = { id: number; patient_number: string; full_name: string };

export type VisitType = "new" | "follow_up" | "emergency";
export type EncounterStatus = "open" | "completed" | "cancelled";

export type Encounter = {
    id: number;
    encounter_number: string;
    patient: PatientRef;
    parent_encounter: EncounterRef | null;
    department: ResourceRef;
    unit: ResourceRef | null;
    visit_type: VisitType;
    status: EncounterStatus;
    chief_complaint: string;
    created_by: ResourceRef;
    completed_by: ResourceRef | null;
    completed_at: string | null;
    cancelled_by: ResourceRef | null;
    cancelled_at: string | null;
    created_at: string;
    updated_at: string;
};

export type CreateEncounterRequest = {
    patient_id: number;
    department_id: number;
    visit_type: Exclude<VisitType, "follow_up">;
    chief_complaint: string;
};

export type CreateFollowUpEncounterRequest = {
    patient_id: number;
    department_id: number;
    unit_id: number;
    visit_type: Extract<VisitType, "follow_up">;
    parent_encounter_id: number;
    chief_complaint: string;
};

export type ModifyEncounterStatusRequest = {
    status: Exclude<EncounterStatus, "open">;
};

export type UpdateEncounterRequest = {
    patient_id?: number;
    department_id?: number;
    unit_id?: number;
    visit_type?: VisitType;
    parent_encounter_id?: number;
    chief_complaint?: string;
};

export type SearchEncountersRequest = {
    search: string;
};

type EncounterListPayload = { encounters: Encounter[] };

export type CreateEncounterResponse = ApiResponse<Encounter>;
export type CreateFollowUpEncounterResponse = ApiResponse<Encounter>;
export type CompleteEncounterResponse = ApiResponse<Encounter>;
export type CancelEncounterResponse = ApiResponse<Encounter>;
export type UpdateEncounterResponse = ApiResponse<Encounter>;
export type GetEncounterByIdResponse = ApiResponse<Encounter>;
export type GetEncountersResponse = ApiResponse<EncounterListPayload>;
export type SearchEncountersResponse = ApiResponse<EncounterListPayload>;