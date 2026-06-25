"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  const user = session?.user;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-2">
        <div><strong>Name:</strong> {user?.name || 'Unknown'}</div>
        <div><strong>Email:</strong> {user?.email || 'Unknown'}</div>
      </div>
    </div>
  );
}
