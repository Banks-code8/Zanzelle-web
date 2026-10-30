// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Link from "next/link";

// import TitleText from "../typography/TitleText";
// import { useAuthStore } from "@/services/hooks/useAuth";
// import MainText from "../typography/MainText";

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();
//   const { login } = useAuthStore();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, isValid },
//   } = useForm({
//     mode: "onChange",
//   });

//   const onSubmit = async (data) => {
//     const payload = {
//       email: data.email,
//       password: data.password,
//     };
//     try {
//       const res = await login(payload);

//       if (!res.success) {
//         toast.error(res.message || "Login failed");
//         return;
//       }

//       toast.success("Login successful");

//       if (res.user?.role === "admin") {
//         router.push("/dashboard");
//       } else {
//         router.push("/");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleGoogleAuth = () => {
//     window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth/google`;
//   };

//   return (
//     <div className="flex items-center justify-center w-full p-6">
//       <div className="w-full space-y-5 ">
//         <div className="flex justify-start">
//           <TitleText text="Welcome back" />
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* -------------email------------ */}
//           <div>
//             {" "}
//             <input
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email required",
//               })}
//               className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
//             />
//             {errors.email && (
//               <p className="text-xs text-primary">{errors.email.message}</p>
//             )}
//           </div>

//           {/* -------------password------------ */}

//           <div className="relative">
//             <div>
//               {" "}
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password required",
//                 })}
//                 className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             <Link
//               href={"/forget-password"}
//               className="w-full grid justify-items-end cursor-pointer"
//             >
//               <MainText text={"Forgot password"} color={"text-primary"} />
//             </Link>
//           </div>

//           {errors.password && (
//             <p className="text-xs text-primary">{errors.password.message}</p>
//           )}

//           <button
//             disabled={!isValid || isSubmitting}
//             className="w-full rounded-[10px] bg-secondary/40 text-secondary text-[16px] py-3 "
//           >
//             {isSubmitting ? "Logging in..." : "Log in"}
//           </button>

//           <div className="text-center text-xs text-gray-400">OR</div>

//           <button
//             type="button"
//             onClick={handleGoogleAuth}
//             className="w-full rounded-[10px] bg-secondary/40 text-[16px] text-secondary py-3 "
//           >
//             Google
//           </button>
//           <button
//             type="button"
//             onClick={handleGoogleAuth}
//             className="w-full rounded-[10px] bg-secondary/40 text-[16px] text-secondary py-3 "
//           >
//             Apple
//           </button>

//           <div className="flex flex-wrap w-full justify-center gap-1">
//             <MainText text={"Dont't have an account? "} />
//             <Link href="/sign-in">
//               {" "}
//               <MainText text={"Create Account"} color={"text-primary"} />
//             </Link>{" "}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
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
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    try {
      const res = await login(payload);

      if (!res?.success) {
        toast.error(res?.message || "Login failed");
        return;
      }

      toast.success(res.message || "Login successful");

      if (res.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("Authentication service is not configured.");
      return;
    }

    window.location.href = `${apiUrl.replace(/\/api\/?$/, "")}/api/oauth/google`;
  };

  const handleAppleAuth = () => {
    toast.error("Apple authentication is not configured yet.");
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full space-y-5">
        <div className="flex justify-start">
          <TitleText text="Welcome back" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
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

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-[10px] bg-secondary p-3 pr-12 text-secondary-light"
              {...register("password", {
                required: "Password is required",
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
              <p className="text-xs text-primary">{errors.password.message}</p>
            )}

            <Link
              href="/forget-password"
              className="grid w-full cursor-pointer justify-items-end"
            >
              <MainText text="Forgot password?" color="text-primary" />
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>

          {/* Divider */}
          <div className="text-center text-xs text-gray-400">OR</div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary"
          >
            Continue with Google
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleAppleAuth}
            className="w-full rounded-[10px] bg-secondary/40 py-3 text-[16px] text-secondary"
          >
            Continue with Apple
          </button>

          {/* Create Account */}
          <div className="flex w-full flex-wrap justify-center gap-1">
            <MainText text="Don't have an account?" />

            <Link href="/sign-in">
              <MainText text="Create Account" color="text-primary" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
