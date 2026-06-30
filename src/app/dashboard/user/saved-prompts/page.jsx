"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import { BookmarkCheck, ExternalLink, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SavedPromptsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    fetch(`${API_BASE_URL}/api/bookmarks/${session.user.email}`)
      .then((r) => r.json())
      .then(setPrompts)
      .catch(() => toast.error("Failed to load bookmarks"))
      .finally(() => setLoading(false));
  }, [session, isPending, router]);

  const handleRemoveBookmark = async (promptId) => {
    setRemoving(promptId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookmarks/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: session?.user?.email, promptId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Bookmark removed");
        setPrompts((p) => p.filter((pr) => pr._id !== promptId));
      } else {
        toast.error(data.error || "Failed to remove bookmark");
      }
    } catch {
      toast.error("Failed to remove bookmark");
    } finally {
      setRemoving(null);
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
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookmarkCheck className="h-6 w-6 text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900">Saved Prompts</h1>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {prompts.length}
        </span>
      </div>

      {prompts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <BookmarkCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-1">No saved prompts</h3>
          <p className="text-sm text-slate-400 mb-4">Bookmark prompts you like to find them later</p>
          <Link
            href="/all-prompts"
            className="inline-flex rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 transition"
          >
            Browse Prompts
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <div
              key={prompt._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                  {prompt.category}
                </span>
                <button
                  onClick={() => handleRemoveBookmark(prompt._id)}
                  disabled={removing === prompt._id}
                  className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50"
                  title="Remove bookmark"
                >
                  {removing === prompt._id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <BookmarkCheck size={16} />
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-1">{prompt.title}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{prompt.description}</p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs text-slate-400">
                  {prompt.copyCount || 0} copies
                </span>
                <Link
                  href={`/prompts/${prompt._id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  View <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
