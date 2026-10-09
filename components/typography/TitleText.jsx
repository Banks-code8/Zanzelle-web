import React from "react";

const TitleText = ({ color, text, textCenter }) => {
  return (
    <h3
      className={`${color ? color : "text-main-white"} ${textCenter ? "text-center" : "text-left"} text-[18px] font-semibold leading-[18px] tracking-normal text-mainBlack md:text-[24px] md:leading-[24px]`}
    >
      {text}
    </h3>
  );
};

export default TitleText;
