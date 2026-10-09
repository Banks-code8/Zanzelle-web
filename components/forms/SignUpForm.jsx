"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TitleText from "../typography/TitleText";
import { registerUser } from "@/services/apiService/authService";
import Link from "next/link";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await registerUser(payload);

      // =====================
      // HANDLE API FAILURE
      // =====================
      if (!res.success) {
        toast.error(res.message || "Signup failed");
        return;
      }

      // =====================
      // SUCCESS
      // =====================
      toast.success("Account created successfully");

      reset();
      window.location.href = "/login";
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth/google`;
  };

  return (
    <div className="flex items-center justify-center rounded-[10px] bg-black/10 p-6">
      <div className="flex w-full max-w-md flex-col justify-center gap-4 rounded-[10px] bg-white p-5 md:gap-8">
        <div className="flex w-full justify-center">
          {" "}
          <TitleText text="Create Account" bold />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              placeholder="Full Name"
              className="w-full rounded-[10px] border-mainGray/50 placeholder:text-mainGray focus:border focus:border-primary"
              {...register("fullName", {
                required: "Full name required",
              })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              placeholder="Email"
              className="w-full rounded-[10px] border-mainGray/50 placeholder:text-mainGray focus:border focus:border-primary"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-[10px] border-mainGray/50 placeholder:text-mainGray focus:border focus:border-primary"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] border bg-primary py-[10px] text-white"
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>

          {/* OR divider */}
          <div className="text-center text-xs text-gray-400">OR</div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] bg-red-500 py-[10px] text-white"
          >
            Continue with Google
          </button>

          {/* LOGIN */}
          <Link href="/login">
            <p className="mt-4 cursor-pointer text-center text-xs text-gray-400 underline hover:text-primary">
              Already have an account
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
