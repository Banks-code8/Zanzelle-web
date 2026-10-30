"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import TitleText from "../typography/TitleText";
import MainText from "../typography/MainText";
import { useAuthStore } from "@/services/hooks/useAuth";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const forgetPassword = useAuthStore((state) => state.forgetPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email.trim().toLowerCase(),
      };

      const res = await forgetPassword(payload);

      if (!res?.success) {
        toast.error(res?.message || "Unable to process your request");
        return;
      }

      toast.success(
        res.message || "If your account exists, a reset link will be sent.",
      );

      router.push("/login");
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full space-y-5">
        <div className="flex justify-start">
          <TitleText text="Forgot your password?" />
        </div>

        <p className="text-sm text-secondary-light">
          Enter the email address associated with your account. If an account
          exists, we will send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-secondary-light"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-[10px] bg-secondary p-3 text-secondary-light outline-none focus:ring-1 focus:ring-primary"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-primary">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
          </button>

          {/* Back to Login */}
          <div className="flex flex-wrap justify-center gap-1">
            <MainText text="Remembered your password?" />

            <Link href="/login">
              <MainText text="Login" color="text-primary" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
