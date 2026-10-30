// "use client";

// import React, { useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import MainButton from "../button/MainButton";
// import { useAuthStore } from "@/services/hooks/useAuth";
// import {
//   RiCustomerService2Line,
//   RiNotification2Fill,
//   RiUser3Fill,
// } from "react-icons/ri";

// const Headers = () => {
//   const user = useAuthStore((state) => state.user);
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const initialized = useAuthStore((state) => state.initialized);
//   const getUserData = useAuthStore((state) => state.getUserData);
//   const logout = useAuthStore((state) => state.logout);

//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) {
//       getUserData();
//     }
//   }, [initialized, getUserData]);
//   const profilePicture =
//     user?.profileImage
//       ?.trim()
//       .split(/\s+/)
//       .filter(Boolean)
//       .map((name) => name[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "";

//   const initials = user?.fullName?.toUpperCase() || "";

//   const isAdmin = user?.role === "admin";

//   return (
//     <header className="p-2">
//       <div className="flex items-center justify-between bg-transparent ">
//         <Link
//           href={"/login"}
//           className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-mainwhite"
//         >
//           <RiUser3Fill className="text-black" />
//         </Link>{" "}
//         {/* ---------is Authenticated-------------- */}
//         <div>
//           {" "}
//           {!initialized ? null : !isAuthenticated ? (
//             <div>
//               <Link href={"/profile"}>
//                 <div className="flex gap-2 items-center">
//                   {" "}
//                   <div
//                     className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-mainwhite"
//                     title={user?.profileImage || "User"}
//                     aria-label={`Signed in as ${user?.profileImage || "User"}`}
//                   >
//                     {/* <Image
//                          src={profilePicture}
//                          alt={`zanzelle ${title}`}
//                          height={100}
//                          width={100}
//                          className={`bg-no-repeat bg-center`}
//                        /> */}
//                     {profilePicture}
//                   </div>
//                   <div
//                     className="flex text-[16px] tracking-tight items-center justify-center rounded-full   font-semibold text-main-white"
//                     title={user?.fullName || "User"}
//                     aria-label={`Signed in as ${user?.fullName || "User"}`}
//                   >
//                     {initials}Bankole Samuel
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               {isAdmin && (
//                 <Link href="/admin">
//                   <MainButton text="Dashboard" textColor={"text-mainblack"} />
//                 </Link>
//               )}
//             </div>
//           )}{" "}
//         </div>
//         <div className="flex items-center gap-2 ">
//           <RiCustomerService2Line size={20} className="text-main-white" />
//           <RiNotification2Fill size={20} className="text-main-white" />
//         </div>{" "}
//       </div>
//     </header>
//   );
// };

// export default Headers;
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MainButton from "../button/MainButton";
import { useAuthStore } from "@/services/hooks/useAuth";
import {
  RiCustomerService2Line,
  RiNotification2Fill,
  RiUser3Fill,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const Headers = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useAuthStore((state) => state.initialized);
  const getUserData = useAuthStore((state) => state.getUserData);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      getUserData();
    }
  }, [initialized, getUserData]);

  // Generate initials from the user's full name.
  const initials =
    user?.fullName
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => name[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  // Uploaded profile picture URL.
  const profileImage = user?.profileImage?.trim() || "";

  const fullName = user?.fullName || "User";
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="p-2">
      <div className="flex items-center justify-between bg-transparent">
        {/* --------- Authentication -------------- */}
        <div>
          {!initialized ? null : isAuthenticated && user ? (
            <Link href="/profile">
              <div className="flex items-center gap-2">
                {/* Profile Picture / Initials */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-black"
                  title={fullName}
                >
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={`${fullName}'s profile picture`}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                {/* Full Name */}
                <div
                  className="flex items-center justify-center rounded-full text-[16px] font-semibold tracking-tight text-main-white"
                  title={fullName}
                  aria-label={`Signed in as ${fullName}`}
                >
                  {fullName}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-black"
            >
              <RiUser3Fill className="text-black" />
            </Link>
          )}
        </div>

        {/* --------- Actions -------------- */}
        <div className="flex items-center gap-3">
          {isAuthenticated && isAdmin && (
            <Link href="/admin">
              <MainButton text="Dashboard" textColor="text-mainblack" />
            </Link>
          )}

          <button
            type="button"
            aria-label="Customer support"
            title="Customer support"
            className="text-main-white transition-opacity hover:opacity-70"
          >
            <RiCustomerService2Line size={20} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            className="text-main-white transition-opacity hover:opacity-70"
          >
            <RiNotification2Fill size={20} />
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
              className="text-main-white transition-opacity hover:opacity-70"
            >
              <RiLogoutBoxRLine size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Headers;
