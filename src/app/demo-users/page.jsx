"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Shield, Crown, User, Sparkles, ChevronLeft, Mail, KeyRound, LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const DEMO_USERS = [
  {
    id: 1,
    name: "Alex Mason",
    email: "admin@demo.com",
    password: "Demo@123",
    address: "789 Admin Blvd, Austin, TX 73301",
    role: "Admin",
    bio: "Platform administrator with full access",
    avatar: "",
    promptsCount: 12,
  },
  {
    id: 2,
    name: "John Cena",
    email: "creator@demo.com",
    password: "Demo@123",
    address: "123 Creator Lane, San Francisco, CA 94102",
    role: "Creator",
    bio: "AI prompt engineer & content creator",
    avatar: "from-amber-400 to-orange-500",
    promptsCount: 24,
  },
  {
    id: 3,
    name: "Maya Haque",
    email: "user@demo.com",
    password: "Demo@123",
    address: "456 Developer Ave, New York, NY 10001",
    role: "User",
    bio: "Frontend developer & AI enthusiast",
    avatar: "from-cyan-400 to-blue-500",
    promptsCount: 5,
  },
];

const roleIcons = {
  Admin: Shield,
  Creator: Crown,
  User: User,
};

const roleGradients = {
  Admin: "from-indigo-500 to-purple-700",
  Creator: "from-amber-500 to-orange-600",
  User: "from-cyan-500 to-blue-600",
};

export default function DemoUsersPage() {
  const router = useRouter();
  const [loggingInAs, setLoggingInAs] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(null);

  const handleLogin = async (user) => {
    setLoggingInAs(user.id);
    try {
      try {
        await fetch("http://localhost:5000/auth/seed-demo", { method: "POST" });
      } catch (err) {
        console.error("Backend seed failed:", err);
      }

      let authResult = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (authResult.error) {
        const registerResult = await authClient.signUp.email({
          email: user.email,
          password: user.password,
          name: user.name,
        });

        if (registerResult.error) {
          toast.error(`Failed to create demo account: ${registerResult.error.message}`);
          setLoggingInAs(null);
          return;
        }

        authResult = await authClient.signIn.email({
          email: user.email,
          password: user.password,
        });
      }

      if (authResult.error) {
        toast.error(`Sign in failed: ${authResult.error.message}`);
        setLoggingInAs(null);
        return;
      }

      if (authResult.data) {
        try {
          const expressRes = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, password: user.password }),
          });
          const expressData = await expressRes.json();
          if (expressRes.ok && expressData.token) {
            localStorage.setItem("express_token", expressData.token);
          }
        } catch (err) {
          console.error("Express login sync failed:", err);
        }

        toast.success(`Signed in as ${user.name}`);
        router.push("/");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      setLoggingInAs(null);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-colors duration-300" style={{ backgroundColor: 'var(--color-navbar-bg)' }}>
        
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-500/20 mb-4">
            <Users className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--color-text)' }}>
            Demo Users
          </h1>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Click on any demo user to instantly sign in and explore the platform with their role.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {DEMO_USERS.map((user) => {
            const RoleIcon = roleIcons[user.role] || User;
            const isLoggingIn = loggingInAs === user.id;
            const isPasswordVisible = visiblePassword === user.id;

            return (
              <div
                key={user.id}
                className="group relative flex flex-col rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-lg overflow-hidden"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
              >
                <div className={`bg-gradient-to-r ${roleGradients[user.role]} px-5 py-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-lg font-bold text-white shadow-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white ring-1 ring-white/30">
                      <RoleIcon size={12} />
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    {user.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{user.bio}</p>

                  <div className="flex items-start gap-2 text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }} />
                    <span>{user.address}</span>
                  </div>

                  <div className="mt-auto rounded-xl border border-dashed p-3.5 space-y-2.5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                      <code className="flex-1 truncate rounded px-2 py-0.5 text-xs font-mono border select-all" style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        {user.email}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <KeyRound className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                      <code className="flex-1 truncate rounded px-2 py-0.5 text-xs font-mono border select-all" style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        {isPasswordVisible ? user.password : "•".repeat(8)}
                      </code>
                      <button
                        type="button"
                        onClick={() => setVisiblePassword(isPasswordVisible ? null : user.id)}
                        className="shrink-0 p-1 rounded-md transition hover:bg-slate-200 dark:hover:bg-slate-600"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                      >
                        {isPasswordVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLogin(user)}
                    disabled={isLoggingIn}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ${
                      isLoggingIn
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 hover:shadow-md active:scale-[0.98]"
                    }`}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Login as {user.role}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
