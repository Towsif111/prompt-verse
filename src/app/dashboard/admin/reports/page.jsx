"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api";
import { Flag, Trash2, CheckCircle, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminReportsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => session?.session?.token || "";

  useEffect(() => {
    if (isPending) return;
    if (!session?.user || session.user.role !== "Admin") {
      router.push("/auth/signin");
      return;
    }
    fetchReports();
  }, [session, isPending, router]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/reports`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setReports(data);
    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: "dismissed" }),
      });
      if (res.ok) {
        toast.success("Report dismissed");
        fetchReports();
      }
    } catch {
      toast.error("Failed to dismiss");
    }
  };

  const handleDeletePrompt = async (promptId) => {
    if (!confirm("Delete the reported prompt permanently?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/prompts/${promptId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        toast.success("Prompt removed");
        fetchReports();
      }
    } catch {
      toast.error("Failed to delete prompt");
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reports/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        toast.success("Report deleted");
        fetchReports();
      }
    } catch {
      toast.error("Failed to delete report");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Flag className="h-6 w-6 text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900">Reported Prompts</h1>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
          {reports.filter(r => r.status === "pending").length} Pending
        </span>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Flag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-1">No reports</h3>
          <p className="text-sm text-slate-400">No prompts have been reported yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    report.status === "pending" ? "bg-red-50" : "bg-slate-50"
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      report.status === "pending" ? "text-red-600" : "text-slate-400"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800">{report.prompt?.title || "Unknown Prompt"}</h3>
                      {report.status === "pending" && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">New</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Reported by {report.reportedBy} • {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {report.prompt && (
                    <Link
                      href={`/prompts/${report.promptId}`}
                      className="rounded-lg p-1.5 text-cyan-600 hover:bg-cyan-50 transition"
                      title="View Prompt"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                  {report.reason}
                </span>
              </div>

              {report.description && (
                <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 mb-3">
                  {report.description}
                </p>
              )}

              {report.status === "pending" && (
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleDeletePrompt(report.promptId)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
                  >
                    <Trash2 size={14} />
                    Remove Prompt
                  </button>
                  <button
                    onClick={() => handleDismiss(report._id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                  >
                    <CheckCircle size={14} />
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report._id)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    Delete Report
                  </button>
                </div>
              )}

              {report.status === "dismissed" && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Dismissed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
