"use client";

import { Camera, Mail, Shield, Crown } from "lucide-react";

export function ProfileCard({ user }) {
  if (!user) return null;

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      {}
      <div className="h-32 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600" />

      {}
      <div className="relative -mt-16 flex flex-col items-center px-6 pb-6 sm:flex-row sm:items-end sm:gap-5">
        <div className="relative">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-32 w-32 rounded-xl border-4 border-white object-cover shadow-lg"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`h-32 w-32 items-center justify-center rounded-xl border-4 border-white bg-gradient-to-br from-cyan-400 to-indigo-600 text-4xl font-bold text-white shadow-lg ${
              user.image ? "hidden" : "flex"
            }`}
          >
            {getInitials(user.name)}
          </div>
        </div>

        <div className="mt-4 flex-1 text-center sm:mt-0 sm:text-left">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            {user.name || "User"}
          </h2>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="inline-flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </span>
            {user.role && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                <Shield className="h-3 w-3" />
                {user.role}
              </span>
            )}
            {user.subscription && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.subscription === "Premium" || user.subscription === "premium"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Crown className="h-3 w-3" />
                {user.subscription}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
