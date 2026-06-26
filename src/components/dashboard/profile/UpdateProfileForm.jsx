"use client";

import { useState } from "react";
import { Button, Input, Label, TextField, FieldError } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Save, Image, User } from "lucide-react";

export function UpdateProfileForm({ user, onUpdate }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      if (data) {
        toast.success("Profile updated successfully!");
        if (onUpdate) onUpdate(data.user);
      }
    } catch (err) {
      toast.error(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <h3 className="mb-5 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
        Update Profile
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          isRequired
          name="name"
          type="text"
          value={name}
          onValueChange={(val) => setName(val)}
        >
          <Label>Name</Label>
          <Input
            placeholder="Enter your name"
            startContent={<User className="h-4 w-4 text-slate-400" />}
          />
          <FieldError />
        </TextField>

        <TextField
          name="image"
          type="url"
          value={image}
          onValueChange={(val) => setImage(val)}
        >
          <Label>Profile Photo URL</Label>
          <Input
            placeholder="https://example.com/avatar.jpg"
            startContent={<Image className="h-4 w-4 text-slate-400" />}
          />
          <FieldError />
        </TextField>

        {}
        {image && (
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <img
              src={image}
              alt="Preview"
              className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 8v4M12 16h.01'/%3E%3C/svg%3E";
              }}
            />
            <div className="text-sm text-slate-500">
              <p className="font-medium text-slate-700">Preview</p>
              <p className="truncate max-w-[300px] text-xs">{image}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full rounded-lg"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
