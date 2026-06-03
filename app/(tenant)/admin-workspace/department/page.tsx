"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAllDepartment,
  useCreateDepartment,
  useSoftDeleteDepartment,
} from "@/lib/hooks/useDepartment";
import { Pagination } from "@/components/ui/Pagination";
import { ActionMenu } from "@/components/ui/ActionMenu";

export default function AdminWorkspaceDepartment() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const queryClient = useQueryClient();

  const { data: deptData, isLoading } = useAllDepartment();
  const { mutate: createDepartment, isPending } = useCreateDepartment();
  const { mutate: toggleActive } = useSoftDeleteDepartment();

  const departments = deptData?.data ?? [];  

  const invalidateDepts = () =>
    queryClient.invalidateQueries({ queryKey: ["departments"] });

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const canSubmit = !!name.trim() && !!code.trim() && !!type.trim();

  function handleAdd() {
    if (!canSubmit) return;
    createDepartment(
      { name, code, type, description } as never,
      {
        onSuccess: () => {
          setName("");
          setCode("");
          setType("");
          setDescription("");
          invalidateDepts();
        },
      }
    );
  }

  return (
    <div className="p-6 space-y-6 bg-white">
      {/* Add New Department */}
      <section className="rounded-[10px]">
        <p className="text-sm font-semibold text-text-muted mb-2">
          Add New Department
        </p>
        <div className="flex gap-3 items-end bg-[#F5F5F5] p-4 rounded-[10px]">
          <div className="flex-1 min-w-0">
            <label className="block font-small-regular font-medium mb-1.5">
              Department Name
            </label>
            <input
              type="text"
              placeholder="e.g., Laboratory"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#BFBFBF] rounded-lg placeholder:text-[12px] px-3 py-2 text-[12px] text-gray-800 placeholder:text-[#BFBFBF] bg-[#FCFCFC] outline-none focus:border-[#2E4EEA] transition-colors"
            />
          </div>

          <div className="flex-1 min-w-0">
            <label className="block font-small-regular font-medium mb-1.5">Code</label>
            <input
              type="text"
              placeholder="e.g., LAB"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full border border-[#BFBFBF] rounded-lg placeholder:text-[12px] px-3 py-2 text-[12px] text-gray-800 placeholder:text-[#BFBFBF] bg-[#FCFCFC] outline-none focus:border-[#2E4EEA] transition-colors"
            />
          </div>

          <div className="flex-1 min-w-0">
            <label className="block font-small-regular font-medium mb-1.5">Type</label>
            <input
              type="text"
              placeholder="e.g., diagnostic"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-[#BFBFBF] rounded-lg placeholder:text-[12px] px-3 py-2 text-[12px] text-gray-800 placeholder:text-[#BFBFBF] bg-[#FCFCFC] outline-none focus:border-[#2E4EEA] transition-colors"
            />
          </div>

          <div className="flex-1 min-w-0">
            <label className="block font-small-regular font-medium mb-1.5">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g., Handles cardiac patient...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#BFBFBF] rounded-lg placeholder:text-[12px] px-3 py-2 text-[12px] text-gray-800 placeholder:text-[#BFBFBF] bg-[#FCFCFC] outline-none focus:border-[#2E4EEA] transition-colors"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={isPending || !canSubmit}
            className="flex items-center gap-1.5 bg-[#2E4EEA] hover:bg-[#2340cc] disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors shrink-0"
          >
            Add Department <span className="text-base leading-none font-bold">+</span>
          </button>
        </div>
      </section>

      {/* Department Record */}
      <section className="space-y-3">
        <p className="text-sm font-semibold text-text-muted">
          Department Record
        </p>

        <div className="flex items-center gap-2 bg-white border border-[#BFBFBF] rounded-[10px] px-4 py-2.5">
          <Search size={16} className="text-[#595959] shrink-0" />
          <input
            type="text"
            placeholder="Search for department"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="text-sm text-gray-700 placeholder:text-[#595959] placeholder:text-[12px] outline-none bg-transparent w-full"
          />
        </div>

        {isLoading ? (
          <div className="text-center text-sm text-gray-400 py-16">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-orange-500 font-medium">No departments yet.</p>
            <p className="text-sm text-orange-500">
              Add your first department to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden min-h-100">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b border-[#BFBFBF] text-xs text-[#595959]">
                  <th className="text-left px-4 py-4 font-medium w-27.5">Dept ID</th>
                  <th className="text-left px-4 py-4 font-medium w-40">Name</th>
                  <th className="text-left px-4 py-4 font-medium w-24">Code</th>
                  <th className="text-left px-4 py-4 font-medium w-30">Type</th>
                  <th className="text-left px-4 py-4 font-medium">Description</th>
                  <th className="text-left px-4 py-4 font-medium w-30">Status</th>
                  <th className="text-left px-4 py-4 font-medium w-20">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BFBFBF]">
                {paginated.map((d) => {
                  const deptId = `DEP-${String(d.id).padStart(3, "0")}`;
                  const statusLabel = d.is_active ? "Active" : "Deactivated";
                  const statusClass = d.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-500";

                  return (
                    <tr
                      key={d.id}
                      className="font-table-fields hover:bg-gray-50 transition-colors h-16"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">{deptId}</td>
                      <td className="px-4 py-4 font-medium text-gray-900 truncate">{d.name}</td>
                      <td className="px-4 py-4 text-[#595959]">{d.code || "—"}</td>
                      <td className="px-4 py-4 text-[#595959] capitalize">{d.type || "—"}</td>
                      <td className="px-4 py-4 text-[#595959] truncate">
                        {d.description || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <ActionMenu
                          actions={[
                            d.is_active
                              ? {
                                  label: "Delete",
                                  onClick: () =>
                                    toggleActive(
                                      { id: d.id, is_active: false },
                                      { onSuccess: invalidateDepts }
                                    ),
                                  variant: "danger",
                                }
                              : {
                                  label: "Retrieve",
                                  onClick: () =>
                                    toggleActive(
                                      { id: d.id, is_active: true },
                                      { onSuccess: invalidateDepts }
                                    ),
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
