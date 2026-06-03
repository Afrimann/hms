import { departmentRepository } from "@/lib/repositories/department.repository";
import { useAuthStore } from "@/lib/store/auth.store";
import type { CreateDepartmentUnitRequest, Department } from "@/types/department.type";

export const departmentService = {
  getAllDepartments() {
    const token = useAuthStore.getState().token!;
    return departmentRepository.getAllDepartments(token);
  },

  getDepartmentById(id: number) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.getDepartmentById(id, token);
  },

  createDepartment(data: Omit<Department, "created_at" | "updated_at">) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.createDepartment(data, token);
  },

  updateDepartment(
    id: number,
    data: Partial<Omit<Department, "id" | "created_at" | "updated_at">>
  ) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.updateDepartment(id, data, token);
  },

  softDeleteDepartment(id: number, is_active: boolean) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.softDeleteDepartment(id, is_active, token);
  },

  createDepartmentUnit(data: CreateDepartmentUnitRequest) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.createDepartmentUnit(data, token);
  },

  listDepartmentUnits() {
    const token = useAuthStore.getState().token!;
    return departmentRepository.listDepartmentUnits(token);
  },

  showDepartmentUnit(id: number) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.showDepartmentUnit(id, token);
  },

  updateDepartmentUnit(
    id: number,
    data: Partial<CreateDepartmentUnitRequest>
  ) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.updateDepartmentUnit(id, data, token);
  },

  deleteDepartmentUnit(id: number) {
    const token = useAuthStore.getState().token!;
    return departmentRepository.deleteDepartmentUnit(id, token);
  },

  
};


