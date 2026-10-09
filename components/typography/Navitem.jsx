import React from 'react';

const Navitem = ({ text }) => {
  return (
    <nav className="cursor-pointer text-[14px] font-semibold leading-[24px] tracking-normal text-mainGray md:text-[16px]">
      {' '}
      {text}{' '}
    </nav>
  );
};

export default Navitem;
