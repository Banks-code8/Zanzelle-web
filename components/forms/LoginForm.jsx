"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import TitleText from "../typography/TitleText";
import { useAuthStore } from "@/services/hooks/useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(payload);

      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      if (res.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth/google`;
  };

  return (
    <div className="flex items-center justify-center rounded-[10px] bg-black/10 p-6">
      <div className="w-full max-w-md space-y-5 rounded-[10px] bg-white p-5">
        <div className="flex justify-center">
          <TitleText text="Login" bold />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email required",
            })}
            className="w-full rounded-[10px]"
          />

          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password required",
              })}
              className="w-full rounded-[10px]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}

          <button
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] bg-primary py-3 text-white"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-xs text-gray-400">OR</div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] bg-red-500 py-3 text-white"
          >
            Continue with Google
          </button>

          <Link href="/sign-up">
            <p className="mt-4 text-center text-xs underline">
              Don't have an account?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
