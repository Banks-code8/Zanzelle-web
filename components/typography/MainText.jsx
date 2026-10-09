import React from "react";

const MainText = ({ color, text, textCenter, textSize }) => {
  return (
    <p
      className={`${color ? color : "text-main-white"} ${textCenter ? "text-center" : "text-left"} ${textSize ? textSize : "text-[14px]"} font-normal leading-[24px] tracking-normal md:text-[16px]`}
    >
      {text}
    </p>
  );
};

export default MainText;
