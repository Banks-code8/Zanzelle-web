"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import TitleText from "../typography/TitleText";
import MainText from "../typography/MainText";
import { useAuthStore } from "@/services/hooks/useAuth";

const VerificationForm = () => {
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const verification = useAuthStore((state) => state.verification);
  const resendVerification = useAuthStore((state) => state.resendVerification);

  const emailFromUrl = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: emailFromUrl,
      otp: "",
    },
  });

  const otp = watch("otp");

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email.trim().toLowerCase(),
        otp: data.otp.trim(),
      };

      const res = await verification(payload);

      if (!res?.success) {
        toast.error(res?.message || "Email verification failed");
        return;
      }

      toast.success(res.message || "Email verified successfully");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Email verification error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during verification",
      );
    }
  };

  const handleOtpChange = (value) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 6);
    setValue("otp", sanitizedValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleResendVerification = async () => {
    const email = watch("email")?.trim().toLowerCase();

    if (!email) {
      toast.error("Enter your email address first");
      return;
    }

    try {
      setIsResending(true);

      const res = await resendVerification({ email });

      if (!res?.success) {
        toast.error(res?.message || "Could not resend verification code");
        return;
      }

      toast.success(res.message || "A new verification code has been sent");
    } catch (error) {
      console.error("Resend verification error:", error);

      toast.error(
        error?.response?.data?.message || "Could not resend verification code",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full space-y-5">
        <div className="flex justify-start">
          <TitleText text="Verify your email" />
        </div>

        <p className="text-sm text-secondary-light">
          Enter the six-digit verification code sent to your email address.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="w-full rounded-[10px] bg-secondary p-3 text-secondary-light"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-xs text-primary">{errors.email.message}</p>
            )}
          </div>

          {/* Six-digit OTP */}
          <div>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={otp}
              className="w-full rounded-[10px] bg-secondary p-3 text-center text-2xl tracking-[0.5em] text-secondary-light"
              {...register("otp", {
                required: "Verification code is required",
                validate: (value) =>
                  /^\d{6}$/.test(value) ||
                  "Enter a valid 6-digit verification code",
              })}
              onChange={(event) => handleOtpChange(event.target.value)}
            />

            {errors.otp && (
              <p className="text-xs text-primary">{errors.otp.message}</p>
            )}
          </div>

          {/* Verify */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </button>

          {/* Resend code */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            <MainText text="Didn't receive the code?" />

            <button
              type="button"
              disabled={isResending || isSubmitting}
              onClick={handleResendVerification}
              className="text-primary disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>

          {/* Login link */}
          <div className="flex flex-wrap justify-center gap-1">
            <MainText text="Already verified?" />

            <Link href="/login">
              <MainText text="Login" color="text-primary" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
