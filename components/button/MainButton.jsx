import React from 'react';

const MainButton = ({ bgColor, text, textColor }) => {
  return (
    <button
      className={`${bgColor ? bgColor : 'border border-primary bg-mainWhite'} ${textColor ? textColor : 'text-mainBlack'} cursor-pointer rounded-[10px] px-[20px] py-[10px] text-[14px] font-semibold shadow-custom-primary transition-all duration-300 hover:scale-105 active:scale-95`}
    >
      {text}
    </button>
  );
};

export default MainButton;
