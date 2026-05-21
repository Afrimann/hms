import { Department } from "@/types/department.type";
import { departmentRepository } from "../repositories/department.repository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";

export const useAllDepartment = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentRepository.getAllDepartments(token!),
    enabled: !!token,
  });
};

export const useDepartmentById = (id: number) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => departmentRepository.getDepartmentById(id, token!),
    enabled: !!token,
  });
}

export const useCreateDepartment = () => {
  const token = useAuthStore((s) => s.token);
  return useMutation({
    mutationFn: (data: Omit<Department, "id" | "created_at" | "updated_at">) =>
      departmentRepository.createDepartment(data, token!),
  });
};

export const useUpdateDepartment = () => {
  const token = useAuthStore((s) => s.token);
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Department, "id" | "created_at" | "updated_at">>;
    }) => departmentRepository.updateDepartment(id, data, token!),
  });
};
