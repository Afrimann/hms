import { ApiResponse } from "./auth.type";
import { Paginated } from "./notifications.types";

export type BillingPatientProfile = {
    id: number;
    patient_number: string;
    full_name: string;
}
export type CashierType = "central" | "departmental";
export type InvoiceStatus = "open" | "paid" | "cancelled";
export type PaymentMethod = "cash" | "card" | "mobile_money";
export type Invoice = {
    id: number;
    invoice_number: string;
    encounter_id: number;
    patient: BillingPatientProfile;
    cashier_type: CashierType;
    cashier_department_id: number | null;
    status: InvoiceStatus;
    total_amount: string;
    amount_paid: string;
    balance: string;
    notes: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
};

export type GetAllInvoicesResponse = ApiResponse<Paginated<Invoice>>;
export type GetInvoiceResponse = ApiResponse<Invoice>;
export type PaymentCompletionRequest = {
    invoice_item_id: number;
    payment_method: PaymentMethod;
    notes?: string;
};

export type PaymentCompletionResponse = ApiResponse<{
    id: number;
    invoice_item_id: number;
    amount: string;
    payment_method: PaymentMethod;
    reference: string | null;
    status: string;
    received_by: number;
    verified_by: number | null;
    verified_at: string | null;
    payment_date: string;
    department_id: number | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}>;