import React from "react";

const PageBorders = ({ children, background }) => {
  return (
    <section
      className={`${background ? `${background}` : "bg-mainWhite"} inset-0 z-50  w-full px-[2vw] py-[2vh] md:fixed md:h-screen md:min-h-0`}
    >
      {children}
    </section>
  );
};

export default PageBorders;
