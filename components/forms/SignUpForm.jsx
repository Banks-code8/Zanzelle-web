// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import TitleText from "../typography/TitleText";
// import { registerUser } from "@/services/apiService/authService";
// import Link from "next/link";
// import MainText from "../typography/MainText";

// const SignUpForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting, isValid },
//   } = useForm({ mode: "onChange" });

//   const onSubmit = async (data) => {
//     const payload = {
//       fullName: data.fullName,
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       const res = await registerUser(payload);

//       // =====================
//       // HANDLE API FAILURE
//       // =====================
//       if (!res.success) {
//         toast.error(res.message || "Signup failed");
//         return;
//       }

//       // =====================
//       // SUCCESS
//       // =====================
//       toast.success("Account created successfully");

//       reset();
//       window.location.href = "/email-verification";
//     } catch (err) {
//       console.error("Unexpected error:", err);
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
//           <TitleText text="Sign-in  to Zanzelle" />
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <input
//               placeholder="Full Name"
//               className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
//               {...register("fullName", {
//                 required: "Full name required",
//               })}
//             />
//             {errors.fullName && (
//               <p className="text-xs text-primary">{errors.fullName.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               placeholder="Email"
//               className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
//               {...register("email", {
//                 required: "Email required",
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: "Invalid email",
//                 },
//               })}
//             />
//             {errors.email && (
//               <p className="text-xs text-primary">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="p-3 w-full rounded-[10px] text-secondary-light bg-secondary"
//               {...register("password", {
//                 required: "Password required",
//                 minLength: {
//                   value: 6,
//                   message: "Min 6 characters",
//                 },
//               })}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-sm"
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//             {errors.password && (
//               <p className="text-xs text-primary">{errors.password.message}</p>
//             )}{" "}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={!isValid || isSubmitting}
//             className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
//           >
//             {isSubmitting ? "Creating Account..." : "Create Account"}
//           </button>

//           {/* OR divider */}
//           <div className="text-center text-xs text-main-white">OR</div>

//           {/* GOOGLE */}
//           <button
//             type="button"
//             onClick={handleGoogleAuth}
//             className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
//           >
//             Google
//           </button>
//           <button
//             type="button"
//             onClick={handleGoogleAuth}
//             className="w-full rounded-[10px] border-none outline-none text-secondary bg-secondary/40 py-[10px] "
//           >
//             Apple
//           </button>
//           {/* LOGIN */}

//           <div className="flex flex-wrap w-full justify-center gap-1">
//             <MainText text={"Already have an account? "} />
//             <Link href="/">
//               {" "}
//               <MainText text={"Login"} color={"text-primary"} />
//             </Link>{" "}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TitleText from "../typography/TitleText";
import { registerUser } from "@/services/apiService/authService";
import Link from "next/link";
import MainText from "../typography/MainText";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    try {
      const res = await registerUser(payload);

      if (!res?.success) {
        toast.error(res?.message || "Signup failed");
        return;
      }

      toast.success(res.message || "Account created. Verify your email.");

      reset();

      router.push(
        `/email-verification?email=${encodeURIComponent(payload.email)}`,
      );
    } catch (err) {
      console.error("Registration error:", err);

      toast.error(err?.response?.data?.message || "Something went wrong");
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
          <TitleText text="Create an account with Zanzelle" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              className="w-full rounded-[10px] bg-secondary p-3 text-secondary-light"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must contain at least 2 characters",
                },
              })}
            />

            {errors.fullName && (
              <p className="text-xs text-primary">{errors.fullName.message}</p>
            )}
          </div>

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
              autoComplete="new-password"
              placeholder="Password"
              className="w-full rounded-[10px] bg-secondary p-3 pr-12 text-secondary-light"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

            {errors.password && (
              <p className="text-xs text-primary">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-[10px] border-none bg-secondary/40 py-[10px] text-main-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* OR Divider */}
          <div className="text-center text-xs text-main-white">OR</div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-[10px] border-none bg-secondary/40 py-[10px] opacity-50 hover:opacity-100 text-main-white outline-none"
          >
            Continue with Google
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleAppleAuth}
            className="w-full rounded-[10px] border-none bg-secondary/40 py-[10px] opacity-50 hover:opacity-100 text-main-white outline-none"
          >
            Continue with Apple
          </button>

          {/* Login */}
          <div className="flex w-full flex-wrap justify-center gap-1">
            <MainText text="Already have an account?" />

            <Link href="/login">
              <MainText text="Login" color="text-primary" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
