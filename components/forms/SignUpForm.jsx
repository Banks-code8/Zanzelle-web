"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TitleText from "../typography/TitleText";
import { registerUser } from "@/services/apiService/authService";
import Link from "next/link";
import MainText from "../typography/MainText";

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
      window.location.href = "/email-verification";
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth/google`;
  };

  return (
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-full space-y-5 ">
        <div className="flex justify-start">
          <TitleText text="Sign-in  to Zanzelle" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              placeholder="Full Name"
              className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
              {...register("fullName", {
                required: "Full name required",
              })}
            />
            {errors.fullName && (
              <p className="text-xs text-primary">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              placeholder="Email"
              className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-primary">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
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
              <p className="text-xs text-primary">{errors.password.message}</p>
            )}{" "}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* OR divider */}
          <div className="text-center text-xs text-main-white">OR</div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
          >
            Google
          </button>
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
          >
            Apple
          </button>
          {/* LOGIN */}

          <div className="flex flex-wrap w-full justify-center gap-1">
            <MainText text={"Already have an account? "} />
            <Link href="/">
              {" "}
              <MainText text={"Login"} color={"text-primary"} />
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
