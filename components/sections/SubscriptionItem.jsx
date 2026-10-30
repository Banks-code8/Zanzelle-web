"use client";

import React, { useState } from "react";
import Image from "next/image";
import vector1 from "../../public/icons/vector1.png";
import vector2 from "../../public/icons/vector2.png";
import vector3 from "../../public/icons/vector3.png";
import vector4 from "../../public/icons/vector4.png";
import vector5 from "../../public/icons/vector5.png";
// import vector6 from "../../public/icons/vector6.png";
import vector7 from "../../public/icons/vector7.png";
import vector8 from "../../public/icons/vector8.png";

import MainCard from "../cards/MainCard";
import { RiCloseLine } from "react-icons/ri";

const SubscriptionItem = () => {
  const [selectedService, setSelectedService] = useState(null);

  const purchase = [
    { icon: vector1, title: "Transfer" },
    { icon: vector2, title: "Airtime" },
    { icon: vector3, title: "Data" },
    { icon: vector4, title: "Savings" },
    { icon: vector5, title: "Betting" },
    { icon: vector5, title: "Electricity" },
    { icon: vector7, title: "Refer" },
    { icon: vector8, title: "More" },
  ];

  return (
    <div>
      {/* Service Cards */}
      <div className="grid grid-cols-4 gap-2">
        {purchase.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSelectedService(item)}
            className="cursor-pointer text-left"
          >
            <MainCard isImage={true} image={item.icon} title={item.title} />
          </button>
        ))}
      </div>

      {/* Service Popup */}
      {selectedService && (
        <div
          className="fixed inset-0 z-9999  flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close popup"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-600 hover:bg-gray-100"
            >
              <RiCloseLine size={24} />
            </button>

            {/* Selected Service */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 p-3">
                <Image
                  src={selectedService.icon}
                  alt={selectedService.title}
                  width={100}
                  height={100}
                  className=" object-contain"
                />
              </div>

              <h2 id="service-title" className="text-xl font-bold text-black">
                {selectedService.title}
              </h2>

              <p className="text-center text-sm text-gray-500">
                You selected {selectedService.title}. Continue to access this
                service.
              </p>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-full rounded-[10px] bg-black px-5 py-3 font-semibold text-white transition hover:opacity-80"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionItem;
