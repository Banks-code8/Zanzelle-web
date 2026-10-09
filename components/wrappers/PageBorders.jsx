import React from "react";

const PageBorders = ({ children, background }) => {
  return (
    <section
      className={`${background ? `${background}` : "bg-mainWhite"} fixed bottom-0 left-0 top-0 z-50 h-screen w-full px-[2vw] py-[4vh]`}
    >
      {children}
    </section>
  );
};

export default PageBorders;
