"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import useDashboardViewModel from "@/components/panel/pages/dashboard/DashboardViewModel";

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PanelDashboard() {
  const {
    dataEvent,
    dataTransaction,
    onChangeOption,
    optionsEventChart,
    optionsTransactionChart,
    valueOption,
    optionEvents,
    optionTransaction,
    loading,
  } = useDashboardViewModel();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="w-full flex flex-col gap-6">
        {/* Transactions Chart */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Transaction Graphic</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-end">
              {isClient && (
                <Select
                  name="transaction"
                  value={optionTransaction.find((opt) => opt.value === valueOption.transaction)}
                  onChange={(e) => onChangeOption("transaction", e?.value || "month")}
                  placeholder="Filter"
                  options={optionTransaction}
                  className="w-fit"
                />
              )}
            </div>
            <div className="my-4"></div>
            {dataTransaction.labels.length > 0 ? (
              <Line options={optionsTransactionChart} data={dataTransaction} />
            ) : (
              <p className="text-center text-gray-500">No transaction data available.</p>
            )}
          </div>
        </div>

        {/* Events Chart */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Event Creation Graphic</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-end">
              {isClient && (
                <Select
                  name="events"
                  value={optionEvents.find((opt) => opt.value === valueOption.events)}
                  onChange={(e) => onChangeOption("events", e?.value || "month")}
                  placeholder="Filter"
                  options={optionEvents}
                  className="w-fit"
                />
              )}
            </div>
            <div className="my-4"></div>
            {dataEvent.labels.length > 0 ? (
              <Line options={optionsEventChart} data={dataEvent} />
            ) : (
              <p className="text-center text-gray-500">No event data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
