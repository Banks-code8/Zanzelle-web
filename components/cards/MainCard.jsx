import Image from "next/image";
import React from "react";
import MainText from "../typography/MainText";

const MainCard = ({ image, title }) => {
  return (
    <div className="w-full p-2 rounded-[10px] bg-secondary">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={image}
          alt={`zanzelle ${title}`}
          height={50}
          width={50}
          className={`bg-no-repeat bg-center`}
        />

        <MainText text={title} color={"text-primary"} />
      </div>
    </div>
  );
};

export default MainCard;
