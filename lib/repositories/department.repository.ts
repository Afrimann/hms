import { apiClient } from "@/lib/api-client";
import type { Department } from "@/types/department.type";

export const departmentRepository = {
    createDepartment(data: Omit<Department, 'id' | 'created_at' | 'updated_at'>, token: string) {
        return apiClient(`/api/departments`, { 
            method: 'POST',
            body: data,
            token
        });
    }
    ,
    getAllDepartments(token: string) {
        return apiClient(`/api/departments`, { 
            method: 'GET',
            token
        });
    }
    ,
    getDepartmentById(id: number, token: string) {
        return apiClient(`/api/departments/${id}`, {
            method: 'GET',
            token
        });
    }
    ,
    updateDepartment(id: number, data: Partial<Omit<Department, 'id' | 'created_at' | 'updated_at'>>, token: string) {
        return apiClient(`/api/departments/${id}`, {
            method: 'PUT',
            body: data,
            token
        });
    }
    ,
    softDeleteDepartment(id: number, is_active: boolean, token: string) {
        return apiClient(`/api/departments/${id}/soft-delete`, {
            method: 'PATCH',
            body: { is_active },
            token
        });
    }
}