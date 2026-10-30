"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MainText from "../typography/MainText";

import logo1 from "../../public/zanzelleLogo1.png";
import logo2 from "../../public/zanzelleLogo2.png";

import {
  RiHandHeartLine,
  RiHome2Line,
  RiLogoutBoxLine,
  RiSaveLine,
  RiSettings2Line,
  RiShieldCheckLine,
} from "react-icons/ri";

import { useAuthStore } from "@/services/hooks/useAuth";

const Menuz = ({ selectedRoute, onSelectRoute }) => {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const menuz = [
    {
      id: "home",
      icon: RiHome2Line,
      title: "Home",
    },
    {
      id: "loan",
      icon: RiSaveLine,
      title: "Loan",
    },
    {
      id: "wealth",
      icon: RiShieldCheckLine,
      title: "Wealth",
    },
    {
      id: "reward",
      icon: RiHandHeartLine,
      title: "Reward",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center md:items-start p-2 justify-between  h-full">
      {/* Logo */}
      <div>
        <div className="hidden md:block">
          <Image
            src={logo1}
            alt="Zanzelle logo"
            height={300}
            width={300}
            className="bg-no-repeat bg-center"
          />
        </div>

        <div className="block md:hidden">
          <Image
            src={logo2}
            alt="Zanzelle icon"
            height={80}
            width={80}
            className="bg-no-repeat bg-center"
          />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="grid gap-4 w-full">
        {menuz.map((item) => {
          const isSelected = selectedRoute === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectRoute(item.id)}
              className={`w-full text-left rounded-[10px] transition-all duration-300 ${
                isSelected ? "bg-primary p-2" : "hover:bg-primary hover:p-2"
              }`}
            >
              <div className="flex justify-center w-full md:justify-start items-center gap-2 group">
                <Icon
                  size={24}
                  className={`${
                    isSelected
                      ? "text-main-black"
                      : "text-primary group-hover:text-main-black/70"
                  }`}
                />

                <div className="hidden md:block">
                  <MainText
                    text={item.title}
                    color={
                      isSelected
                        ? "text-main-black"
                        : "text-primary group-hover:text-main-black/70"
                    }
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* General */}
      <div className="flex flex-col md:items-start items-center gap-4 w-full">
        <div className="hidden md:block">
          <MainText text="General" />
        </div>

        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center md:justify-start justify-center w-full gap-2 group hover:bg-primary hover:rounded-[10px] hover:p-2 transition-all duration-300"
        >
          <RiSettings2Line
            size={24}
            className="text-primary group-hover:text-main-black/70"
          />

          <div className="hidden md:block">
            <MainText
              text="Settings"
              color="text-primary group-hover:text-main-black/70"
            />
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center  md:justify-start justify-center w-full gap-2 group hover:bg-primary hover:rounded-[10px] hover:p-2 transition-all duration-300"
        >
          <RiLogoutBoxLine
            size={24}
            className="text-primary group-hover:text-main-black/70"
          />

          <div className="hidden md:block">
            <MainText
              text="Logout"
              color="text-primary group-hover:text-main-black/70"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Menuz;
