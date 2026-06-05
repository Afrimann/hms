"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useStaff, useCreateStaff, useRoles, useDeactivateStaff, useReactivateStaff, useResendInvite } from "@/lib/hooks/useStaff";
import { useAllDepartment } from "@/lib/hooks/useDepartment";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/ui/Pagination";
import { ActionMenu } from "@/components/ui/ActionMenu";

export default function AdminWorkspaceStaff() {
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState<number | "">("");
    const [role, setRole] = useState("");
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    const queryClient = useQueryClient();

    const { data: staffData, isLoading } = useStaff();
    const { data: rolesData } = useRoles();
    const { data: deptData } = useAllDepartment();

    const { mutate: createStaff, isPending } = useCreateStaff();
    const { mutate: deactivate } = useDeactivateStaff();
    const { mutate: reactivate } = useReactivateStaff();
    const { mutate: resendInvite } = useResendInvite();

    const invalidateStaff = () => queryClient.invalidateQueries({ queryKey: ["staff"] });

    const staff = staffData?.data ?? [];
    const departments = deptData?.data ?? [];
    const roles = rolesData?.data ?? [];


    const filtered = staff.filter(
        (s) =>
            s.full_name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const canSubmit = !!email && departmentId !== "" && !!role;

    function handleAdd() {
        if (!canSubmit) return;
        createStaff(
            { email, department_id: Number(departmentId), role },
            {
                onSuccess: () => {
                    setEmail("");
                    setDepartmentId("");
                    setRole("");
                    queryClient.invalidateQueries({ queryKey: ["staff"] });
                },
            }
        );
    }

    return (
        <div className="p-6 space-y-6 bg-white">
            {/* Add New Staff */}
            <section className="rounded-[10px]">
                <p className="text-sm font-semibold text-text-muted mb-2">Add New Staff</p>
                <div className="flex gap-3 items-end bg-[#F5F5F5] p-4 rounded-[10px]">
                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-small-regular mb-1.5 font-medium">
                            Work/Corporate Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="e.g., director@yourhospital.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-[#BFBFBF] rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-[#BFBFBF] bg-[#FCFCFC] outline-none focus:border-[#2E4EEA] transition-colors"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-small-regular mb-1.5 font-medium">Department</label>
                        <Select
                            value={departmentId}
                            onChange={(v) => setDepartmentId(v as number)}
                            placeholder="e.g., Front Desk"
                            options={departments.map((d) => ({ label: d.name, value: d.id }))}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-small-regular mb-1.5 font-medium">Role</label>
                        <Select
                            value={role}
                            onChange={(v) => setRole(v as string)}
                            placeholder="e.g., Receptionist"
                            options={roles.map((r) => ({
                                label: r.name.replace(/_/g, " "),
                                value: r.name,
                            }))}
                        />
                    </div>

                    <button
                        onClick={handleAdd}
                        disabled={isPending || !canSubmit}
                        className="flex items-center gap-1.5 bg-[#2E4EEA] hover:bg-[#2340cc] disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors shrink-0"
                    >
                        Add Staff <span className="text-base leading-none font-bold">+</span>
                    </button>
                </div>
            </section>

            {/* Staff Record */}
            <section className="space-y-3">
                <p className="text-sm font-semibold text-text-muted">Staff Record</p>

                <div className="flex items-center gap-2 bg-white border border-[#BFBFBF] rounded-[10px] px-4 py-2.5">
                    <Search size={16} className="text-[#595959] shrink-0" />
                    <input
                        type="text"
                        placeholder="Search for staff"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="text-sm text-gray-700 placeholder:text-[#595959] placeholder:text-[12px] outline-none bg-transparent w-full"
                    />
                </div>

                {isLoading ? (
                    <div className="text-center text-sm text-gray-400 py-16">Loading…</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-sm text-orange-500 font-medium">No staff records yet.</p>
                        <p className="text-sm text-orange-500">
                            Add your first team member to start managing records.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden min-h-[400px]">
                        <table className="w-full text-sm table-fixed">
                            <thead>
                                <tr className="border-b border-[#BFBFBF] text-xs text-[#595959]">
                                    <th className="text-left px-4 py-4 font-medium w-27.5">Staff ID</th>
                                    <th className="text-left px-4 py-4 font-medium w-40">Full Name</th>
                                    <th className="text-left px-4 py-4 font-medium">Email Address</th>
                                    <th className="text-left px-4 py-4 font-medium w-32.5">Role</th>
                                    <th className="text-left px-4 py-4 font-medium w-37.5">Department</th>
                                    <th className="text-left px-4 py-4 font-medium w-30">Status</th>
                                    <th className="text-left px-4 py-4 font-medium w-20">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#BFBFBF]">
                                {paginated.map((s) => {
                                    const isPending = !s.joined_at;
                                    //   const isSuspended = !s.is_active && !!s.joined_at;
                                    const isActive = s.is_active && !!s.joined_at;

                                    const statusLabel = isActive ? "Active" : isPending ? "Pending" : "Suspended";
                                    const statusClass = isActive
                                        ? "bg-green-100 text-green-700"
                                        : isPending
                                            ? "bg-orange-100 text-orange-600"
                                            : "bg-red-100 text-red-500";

                                    const staffId = `SID-${String(s.id).padStart(3, "0")}`;
                                    const fullName = s.full_name?.trim() || "—";
                                    const role = s.roles[0]
                                        ? s.roles[0].charAt(0).toUpperCase() + s.roles[0].slice(1)
                                        : "—";
                                    const department = s.departments[0]?.name ?? "—";

                                    return (
                                        <tr
                                            key={s.id}
                                            className="font-table-fields hover:bg-gray-50 transition-colors h-16"
                                        >
                                            <td className="px-4 py-4 font-medium text-gray-900">{staffId}</td>
                                            <td className="px-4 py-4 font-medium text-gray-900 truncate">{fullName}</td>
                                            <td className="px-4 py-4 text-[#595959] truncate">{s.email}</td>
                                            <td className="px-4 py-4 text-[#595959] truncate">{role}</td>
                                            <td className="px-4 py-4 text-[#595959] truncate">{department}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                                                    {statusLabel}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <ActionMenu
                                                    actions={[
                                                        {
                                                            label: "Resend Invite",
                                                            onClick: () => resendInvite(s.id, { onSuccess: invalidateStaff }),
                                                            disabled: !!s.joined_at,
                                                        },
                                                        s.is_active
                                                            ? {
                                                                label: "Deactivate",
                                                                onClick: () => deactivate(s.id, { onSuccess: invalidateStaff }),
                                                                variant: "danger",
                                                            }
                                                            : {
                                                                label: "Reactivate",
                                                                onClick: () => reactivate(s.id, { onSuccess: invalidateStaff }),
                                                            },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
