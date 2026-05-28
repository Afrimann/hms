import { apiClient } from "@/lib/api-client";
import type {
  CreateDepartmentUnitRequest,
  Department,
} from "@/types/department.type";

class DepartmentRepository {
  private readonly basePath = "/api/departments";
  private readonly unitBasePath = "/api/department-units";

  createDepartment(
    data: Omit<Department, "created_at" | "updated_at">,
    token: string,
  ) {
    return apiClient(this.basePath, {
      method: "POST",
      body: data,
      token,
    });
  }

  getAllDepartments(token: string) {
    return apiClient<Department[]>(this.basePath, {
      method: "GET",
      token,
    });
  }

  getDepartmentById(id: number, token: string) {
    return apiClient<Department>(`${this.basePath}/${id}`, {
      method: "GET",
      token,
    });
  }

  updateDepartment(
    id: number,
    data: Partial<Omit<Department, "id" | "created_at" | "updated_at">>,
    token: string,
  ) {
    return apiClient<Department>(`${this.basePath}/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  }

  softDeleteDepartment(id: number, is_active: boolean, token: string) {
    return apiClient(`${this.basePath}/${id}/`, {
      method: "DELETE",
      body: { is_active },
      token,
    });
  }

  createDepartmentUnit(data: CreateDepartmentUnitRequest, token: string) {
    return apiClient(this.unitBasePath, {
      method: "POST",
      body: data,
      token,
    });
  }

  listDepartmentUnits(token: string) {
    return apiClient(this.unitBasePath, {
      method: "GET",
      token,
    });
  }

  showDepartmentUnit(id: number, token: string) {
    return apiClient(`${this.unitBasePath}/${id}`, {
      method: "GET",
      token,
    });
  }

  updateDepartmentUnit(
    id: number,
    data: Partial<Omit<CreateDepartmentUnitRequest, "department_id">>,
    token: string,
  ) {
    return apiClient(`${this.unitBasePath}/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  }

  deleteDepartmentUnit(id: number, token: string) {
    return apiClient(`${this.unitBasePath}/${id}`, {
      method: "DELETE",
      token,
    });
  }
}

export const departmentRepository = new DepartmentRepository();