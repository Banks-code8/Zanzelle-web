import React from "react";

const MainButton = ({ bgColor, icon, text, textColor }) => {
  return (
    <button
      className={`${bgColor ? bgColor : " bg-main-black"} ${textColor ? textColor : "text-main-white"} group transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded-[10px] px-5 py-3 text-[14px] font-semibold shadow-custom-primary `}
    >
      <span className="flex justify-center items-center gap-2  group-hover:font-bold">
        {icon} {text}
      </span>
    </button>
  );
};

export default MainButton;
