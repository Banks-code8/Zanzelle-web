"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import TitleText from "../typography/TitleText";
import { useAuthStore } from "@/services/hooks/useAuth";
import MainText from "../typography/MainText";

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
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-full space-y-5 ">
        <div className="flex justify-center">
          <TitleText text="Welcome back" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* -------------email------------ */}
          <div>
            {" "}
            <input
              placeholder="Email"
              {...register("email", {
                required: "Email required",
              })}
              className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* -------------password------------ */}

          <div className="relative">
            <div>
              {" "}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password required",
                })}
                className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="w-full grid justify-items-end">
              <MainText text={"Forgot password"} color={"text-primary"} />
            </div>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}

          <button
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] bg-secondary/40 text-secondary text-[16px] py-3 "
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>

          <div className="text-center text-xs text-gray-400">OR</div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] bg-secondary/40 text-[16px] text-secondary py-3 "
          >
            Google
          </button>
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] bg-secondary/40 text-[16px] text-secondary py-3 "
          >
            Apple
          </button>

          <Link href="/sign-up">
            <div className="flex flex-wrap w-full justify-center gap-1">
              <MainText text={"Dont't have an account? "} />
              <MainText text={"Create Account"} color={"text-primary"} />
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
