"use client";

import React, { useState } from "react";

import Headers from "../partials/Headers";
import Menuz from "../partials/Menuz";

import SubscriptionItem from "./SubscriptionItem";
import RewardItems from "./RewardItems";
import LoanItem from "./LoanItem";
import AccountItem from "./AccountItem";

const DashboardItem = () => {
  const [selectedRoute, setSelectedRoute] = useState("home");

  // Dashboard content renderer
  const renderDashboardContent = () => {
    switch (selectedRoute) {
      case "home":
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 rounded-[10px] w-full bg-secondary-light">
            {/* Main Dashboard */}
            <div className="col-span-3">
              <div className="flex flex-col gap-4">
                <AccountItem />
                <SubscriptionItem />
              </div>
            </div>

            {/* Savings */}
            <div className="col-span-2 hidden md:block bg-main-black rounded-[10px]">
              <div>Savings</div>
            </div>
          </div>
        );

      case "loan":
        return <LoanItem />;

      case "reward":
        return <RewardItems />;

      case "wealth":
        return (
          <div className="bg-secondary-light rounded-[10px] p-4">
            <h2>Wealth Management</h2>
          </div>
        );

      default:
        return <AccountItem />;
    }
  };

  return (
    <div className="flex gap-2 h-full min-h-0">
      {/* Sidebar */}
      <div className="h-full">
        <Menuz selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
      </div>

      {/* Dashboard Content */}
      <div className="flex flex-col gap-2 w-full min-h-0">
        <Headers />

        <div className="w-full min-h-0 overflow-y-auto">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
