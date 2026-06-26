"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, FileText, DollarSign, Flag,
  TrendingUp, LogOut, Shield,
  PlusCircle, BookmarkCheck, MessageSquare, User,
  BarChart3, Crown, Home, Sparkles, Menu, X
} from "lucide-react";
import toast from "react-hot-toast";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || "User";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => pathname === href || pathname?.startsWith(href + "/");

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  const adminNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users, label: "All Users", href: "/dashboard/admin/users" },
    { icon: FileText, label: "All Prompts", href: "/dashboard/admin/prompts" },
    { icon: DollarSign, label: "Payments", href: "/dashboard/admin/payments" },
    { icon: Flag, label: "Reports", href: "/dashboard/admin/reports" },
    { icon: TrendingUp, label: "Analytics", href: "/dashboard/admin/analytics" },
  ];

  const creatorNavItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/creator" },
    { icon: PlusCircle, label: "Add Prompt", href: "/dashboard/creator/add-prompt" },
    { icon: FileText, label: "My Prompts", href: "/dashboard/creator/my-prompts" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  const userNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/user" },
    { icon: PlusCircle, label: "Add Prompt", href: "/dashboard/user/add-prompt" },
    { icon: FileText, label: "My Prompts", href: "/dashboard/user/my-prompts" },
    { icon: BookmarkCheck, label: "Saved Prompts", href: "/dashboard/user/saved-prompts" },
    { icon: MessageSquare, label: "My Reviews", href: "/dashboard/user/my-reviews" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  let navItems, roleBadgeColor, roleBadgeText, avatarGradient;

  if (role === "Admin") {
    navItems = adminNavItems;
    roleBadgeColor = "from-indigo-400 to-purple-600";
    roleBadgeText = "Admin";
    avatarGradient = "from-indigo-400 to-purple-600";
  } else if (role === "Creator") {
    navItems = creatorNavItems;
    roleBadgeColor = "from-amber-400 to-orange-500";
    roleBadgeText = "Creator";
    avatarGradient = "from-cyan-400 to-indigo-600";
  } else {
    navItems = userNavItems;
    roleBadgeColor = "from-cyan-400 to-blue-500";
    roleBadgeText = "User";
    avatarGradient = "from-cyan-400 to-indigo-600";
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--color-border-light)' }}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${avatarGradient} text-white font-bold`}>
          {role === "Admin" ? <Shield className="h-5 w-5" /> : role === "Creator" ? <Crown className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{user?.name || "User"}</p>
          <span className={`rounded-full bg-gradient-to-r ${roleBadgeColor} px-2 py-0.5 text-xs font-medium text-white`}>{roleBadgeText}</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              isActive(item.href)
                ? "bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-900/30 dark:to-indigo-900/30 text-cyan-700 dark:text-cyan-300 font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.href) ? "text-cyan-600 dark:text-cyan-400" : ""}`} style={{ color: isActive(item.href) ? undefined : 'var(--color-text-secondary)' }} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3 space-y-1">
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100">
          <Home className="h-5 w-5" /> Back to Home
        </Link>
        <Link href="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-amber-600 transition hover:bg-amber-50">
          <Sparkles className="h-5 w-5" /> Pricing
        </Link>
        <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50">
          <LogOut className="h-5 w-5" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="fixed left-4 top-[60px] z-50 flex h-10 w-10 items-center justify-center rounded-xl shadow-md lg:hidden transition-colors" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', borderWidth: '1px', borderStyle: 'solid' }} aria-label="Toggle sidebar">
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside className={`fixed left-0 top-0 z-50 flex h-full w-64 shrink-0 flex-col border-r transition-transform duration-300 lg:hidden ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`} style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
        {sidebarContent}
      </aside>

      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
        {sidebarContent}
      </aside>
    </>
  );
}
