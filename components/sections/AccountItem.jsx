"use client";

import React, { useState } from "react";
import Link from "next/link";
import MainButton from "../button/MainButton";
import { RiEyeLine, RiEyeOffLine, RiAddLine } from "react-icons/ri";
import MainText from "../typography/MainText";

const AccountItem = () => {
  const [showBalance, setShowBalance] = useState(true);

  // Replace with the actual wallet balance from your API.
  const balance = 12345678.78;
  const currency = "NGN";

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="w-full">
      {/* Available Balance */}
      <div className="block w-full space-y-5 rounded-[10px] bg-primary px-5 py-8 md:flex md:items-center md:justify-between md:space-y-0 md:py-10">
        {/* Balance */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <MainText
              text="Available Balance"
              color="text-main-black"
              textSize="text-[18px] md:text-[20px]"
            />

            <button
              type="button"
              onClick={() => setShowBalance((prev) => !prev)}
              aria-label={showBalance ? "Hide balance" : "Show balance"}
              title={showBalance ? "Hide balance" : "Show balance"}
              className="transition-opacity hover:opacity-70"
            >
              {showBalance ? (
                <RiEyeLine size={20} />
              ) : (
                <RiEyeOffLine size={20} />
              )}
            </button>
          </div>

          <p className="break-words text-[18px] font-semibold tracking-tight text-main-black md:text-[24px]">
            {showBalance ? formattedBalance : "••••••••"}
          </p>
        </div>

        {/* Transaction History and Add Money */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Link
            href="/transaction-history"
            className="text-[16px]  text-main-black transition-opacity hover:opacity-70"
          >
            Transaction History
          </Link>

          <Link href="/add-money ">
            <MainButton
              icon={<RiAddLine size={20} className="text-main-white" />}
              text="Add Money"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
