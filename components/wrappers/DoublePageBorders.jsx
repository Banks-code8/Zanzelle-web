import React from 'react';

const DoublePageBorders = ({ background, children }) => {
  return (
    <section className="px-[4vw] py-[8vh]">
      <div
        className={`${background ? `${background}` : 'bg-mainWhite'} rounded-[20px] px-[4vw] py-[10vh]`}
      >
        {children}
      </div>
    </section>
  );
};

export default DoublePageBorders;
