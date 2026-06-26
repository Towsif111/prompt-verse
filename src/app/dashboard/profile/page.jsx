"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { ProfileCard } from "@/components/dashboard/profile/ProfileCard";
import { UpdateProfileForm } from "@/components/dashboard/profile/UpdateProfileForm";
import { Settings } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          <p className="text-sm text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-slate-600" />
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Profile Settings</h1>
      </div>

      <ProfileCard user={user} />
      <UpdateProfileForm user={user} />
    </div>
  );
}
