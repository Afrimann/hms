import { CreateDepartmentUnitRequest, Department } from "@/types/department.type";
import { departmentService } from "@/lib/services/department.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";

export const useAllDepartment = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentService.getAllDepartments(),
    enabled: !!token,
  });
};

export const useDepartmentById = (id: number) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => departmentService.getDepartmentById(id),
    enabled: !!token,
  });
};

export const useCreateDepartment = () => {
  return useMutation({
    mutationFn: (data: Omit<Department, "created_at" | "updated_at">) =>
      departmentService.createDepartment(data),
  });
};

export const useUpdateDepartment = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Department, "id" | "created_at" | "updated_at">>;
    }) => departmentService.updateDepartment(id, data),
  });
};

export const useSoftDeleteDepartment = () => {
  return useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      departmentService.softDeleteDepartment(id, is_active),
  });
};

export const useCreateDepartmentUnit = () => {
  return useMutation({
    mutationFn: (data: CreateDepartmentUnitRequest) =>
      departmentService.createDepartmentUnit(data),
  });
}

export const useListDepartmentUnits = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["department-units"],
    queryFn: () => departmentService.listDepartmentUnits(),
    enabled: !!token,
  });
};

export const useShowDepartmentUnit = (id: number) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["department-units", id],
    queryFn: () => departmentService.showDepartmentUnit(id),
    enabled: !!token,
  });
};

export const useUpdateDepartmentUnit = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateDepartmentUnitRequest>;
    }) => departmentService.updateDepartmentUnit(id, data),
  });
};

export const useDeleteDepartmentUnit = () => {
  return useMutation({
    mutationFn: (id: number) => departmentService.deleteDepartmentUnit(id),
  });
};

