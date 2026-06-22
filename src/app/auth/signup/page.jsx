"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (error) {
      toast.error(error.message || "Sign up failed. Please try again.");
      return;
    }

    if (data) {
      toast.success("Account created successfully.");
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({ provider: "google" });

    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="text-center mb-6">
        <h1 className="font-bold text-3xl">Create Account</h1>
        <p className="text-gray-600">Join the PromptVerse community</p>
      </div>

      <Card className="border p-6 w-full max-w-md mx-auto">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? null
                : "Please enter a valid email address"
            }
          >
            <Label>Email</Label>
            <Input placeholder="admin@example.com" />
            <FieldError />
          </TextField>

          <TextField name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="Enter your image URL" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Password must contain at least one number";
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>

          <Button type="submit" className="w-full rounded-none">
            Create Account
          </Button>
        </Form>

        <div className="flex items-center justify-center my-4">
          <Separator />
          <span className="px-3 text-sm text-gray-500">Or Sign Up With</span>
          <Separator />
        </div>

        <Button onClick={handleGoogleSignIn} className="w-full rounded-none">
          <FcGoogle className="mr-2" /> Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default SignUpPage;
