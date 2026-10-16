"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import TitleText from "../typography/TitleText";
import { useAuthStore } from "@/services/hooks/useAuth";

const VerificationForm = () => {
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
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-full space-y-5 ">
        <div className="flex justify-start">
          <TitleText text="Verify your email" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* -------------otp------------ */}

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 ">
              {" "}
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                required
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                required
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                required
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                required
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                required
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                {...register("password")}
                className="p-3 w-full text-[16px] text-center rounded-[10px] text-secondary-light bg-secondary"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end w-full">
                {" "}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=""
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <button
                disabled={!isValid || isSubmitting}
                className={`${isValid ? "" : "text-main-white bg-primary"} w-full rounded-[10px] bg-secondary/40 text-secondary text-[16px] py-3 `}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
