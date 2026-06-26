"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, FileText, PlusCircle,
  BarChart3, User, Settings, LogOut,
  ChevronRight, Crown
} from "lucide-react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export function CreatorSidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const navItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/creator" },
    { icon: PlusCircle, label: "Add Prompt", href: "/dashboard/creator/add-prompt" },
    { icon: FileText, label: "My Prompts", href: "/dashboard/creator/my-prompts" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
      <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--color-border-light)' }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-white font-bold">
          {user?.name?.charAt(0) || "C"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{user?.name || "Creator"}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Creator Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <item.icon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-3 space-y-1" style={{ borderColor: 'var(--color-border-light)' }}>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <ChevronRight className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
          Back to Home
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/30"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
