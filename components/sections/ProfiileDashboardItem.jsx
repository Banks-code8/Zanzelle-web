"use client";
import { logoutUser } from "@/services/apiService/authService";
import React from "react";

const ProfiileDashboardItem = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="text-main-white">
      ProfiileDashboardItem{" "}
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfiileDashboardItem;
