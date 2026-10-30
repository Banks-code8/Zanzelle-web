"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import TitleText from "../typography/TitleText";
import MainText from "../typography/MainText";
import { useAuthStore } from "@/services/hooks/useAuth";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const resetPassword = useAuthStore((state) => state.resetPassword);
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Password reset token is missing or invalid.");
      return;
    }

    try {
      const payload = {
        token,
        password: data.password,
      };

      const res = await resetPassword(payload);

      if (!res?.success) {
        toast.error(res?.message || "Password reset failed.");
        return;
      }

      toast.success(res.message || "Password reset successfully.");

      router.push("/login");
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to reset your password. Please try again.",
      );
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full space-y-5">
        <div className="flex justify-start">
          <TitleText text="Reset your password" />
        </div>

        <p className="text-sm text-secondary-light">
          Create a new password for your account.
        </p>

        {!token ? (
          <div className="space-y-4">
            <p className="text-sm text-primary">
              This password reset link is missing its token. Please request a
              new reset link.
            </p>

            <Link
              href="/forget-password"
              className="block text-center text-primary underline"
            >
              Request a new reset link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="New password"
                className="w-full rounded-[10px] bg-secondary p-3 pr-12 text-secondary-light outline-none focus:ring-1 focus:ring-primary"
                {...register("password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must contain at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

              {errors.password && (
                <p className="mt-1 text-xs text-primary">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm new password"
                className="w-full rounded-[10px] bg-secondary p-3 pr-12 text-secondary-light outline-none focus:ring-1 focus:ring-primary"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-primary">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Resetting password..." : "Reset Password"}
            </button>

            {/* Login Link */}
            <div className="flex flex-wrap justify-center gap-1">
              <MainText text="Remembered your password?" />

              <Link href="/login">
                <MainText text="Login" color="text-primary" />
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
