import React from "react";

const PageBorders = ({ children, background }) => {
  return (
    <section
      className={`${background ? `${background}` : "bg-mainWhite"} overflow-hidden inset-0 z-50  w-full px-[2vw] py-[2vh] md:fixed  `}
    >
      <div className="overflow-y-auto">{children}</div>
    </section>
  );
};

export default PageBorders;
// import React from "react";

// const PageBorders = ({ children, background }) => {
//   return (
//     <section
//       className={`${
//         background || "bg-mainWhite"
//       } fixed inset-0 z-50 h-screen w-full overflow-hidden px-[2vw] py-[2vh]`}
//     >
//       <div className="h-full overflow-x-hidden overflow-y-auto">{children}</div>
//     </section>
//   );
// };

// export default PageBorders;
