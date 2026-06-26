"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Sparkles, UserPlus, LogOut, ChevronDown, LayoutDashboard, Shield, Crown, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setShowDropdown(false);
      await signOut();
      toast.success("Signed out successfully.");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      toast.error(error?.message || "Sign out failed. Please try again.");
      console.error("Sign out failed:", error);
    }
  };

  const user = session?.user;
  const isAdmin = user?.role === "Admin";
  const isCreator = user?.role === "Creator";

  const getDashboardHref = () => {
    if (isAdmin) return "/dashboard/admin";
    if (isCreator) return "/dashboard/creator";
    return "/dashboard/user";
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  const getRoleBadge = () => {
    if (isAdmin) return { text: "Admin", color: "text-indigo-600 dark:text-indigo-400", icon: Shield };
    if (isCreator) return { text: "Creator", color: "text-amber-600 dark:text-amber-400", icon: Crown };
    return null;
  };

  const role = getRoleBadge();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 backdrop-blur-xl transition-colors duration-300" style={{ backgroundColor: 'var(--color-navbar-bg)' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 transition duration-200 group-hover:scale-[1.03]">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold text-cyan-700/80 dark:text-cyan-400/80">
              Prompt Verse
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="btn font-bold btn-ghost btn-sm border border-transparent text-2xl text-slate-700 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/all-prompts"
            className="btn font-bold btn-ghost btn-sm border border-transparent text-2xl text-slate-700 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            All Prompts
          </Link>
          <Link
            href="/pricing"
            className="btn font-bold btn-ghost btn-sm border border-transparent text-2xl text-slate-700 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isPending ? null : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 transition hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-8 w-8 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <span
                  className={`h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 text-sm font-bold text-white ${
                    user.image ? "hidden" : "flex"
                  }`}
                >
                  {getInitials(user.name)}
                </span>
                <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-300 sm:inline">
                  {user.name || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50">
                  <div className="border-b border-slate-100 dark:border-slate-700 px-4 py-3">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                    {role && (
                      <span className={`mt-1 inline-flex items-center gap-1 rounded-full bg-slate-50 dark:bg-slate-700 px-2 py-0.5 text-xs font-medium ${role.color}`}>
                        <role.icon size={12} />
                        {role.text}
                      </span>
                    )}
                  </div>
                  <div className="p-1">
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    
                    {isAdmin && (
                      <>
                        <Link
                          href="/dashboard/admin/users"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Shield className="h-4 w-4" />
                          Manage Users
                        </Link>
                        <Link
                          href="/dashboard/admin/prompts"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Shield className="h-4 w-4" />
                          Manage Prompts
                        </Link>
                      </>
                    )}
                    
                    {isCreator && (
                      <Link
                        href="/dashboard/creator"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Crown className="h-4 w-4" />
                        Creator Dashboard
                      </Link>
                    )}

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <UserPlus className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    
                    {user.subscription !== "Premium" && user.subscription !== "premium" && (
                      <Link
                        href="/payment"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-700 dark:text-amber-400 transition hover:bg-amber-50 dark:hover:bg-amber-900/30"
                      >
                        <Crown className="h-4 w-4" />
                        Upgrade to Premium
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/signin" className="user-profile" aria-label="Login">
                <span className="user-profile-inner">
                  <LogIn />
                  <span>Sign In</span>
                </span>
              </Link>
              <Link href="/auth/signup" className="user-profile" aria-label="Sign up">
                <span className="user-profile-inner">
                  <UserPlus />
                  <span>Sign Up</span>
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
