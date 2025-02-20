import { panelGetDashboard } from "@/helpers/handlers/apis/dashboard.api";
import { useEffect, useState } from "react";

interface TransactionData {
  id: number;
  total_price: number;
  created_at: string;
}

interface EventData {
  id: number;
  created_at: string;
}

export default function useDashboardViewModel() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await panelGetDashboard()).data;

        setTransactions(data.transactions || []);
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const [valueOption, setValueOption] = useState({ transaction: "month", events: "month" });

  function onChangeOption(key: "transaction" | "events", value: string) {
    setValueOption((prev) => ({ ...prev, [key]: value }));
  }

  const optionTransaction = [
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Day", value: "day" },
  ];

  const optionEvents = [
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Day", value: "day" },
  ];

  const optionsTransactionChart = { responsive: true };
  const optionsEventChart = { responsive: true };

  // Group transactions by created_at date
  const transactionCounts = transactions.reduce((acc: Record<string, number>, t) => {
    const date = new Date(t.created_at).toISOString().split("T")[0]; // Format: YYYY-MM-DD
    acc[date] = (acc[date] || 0) + t.total_price;
    return acc;
  }, {});

  // Group events by created_at date
  const eventCounts = events.reduce((acc: Record<string, number>, e) => {
    if (!e.created_at) return acc; // Skip if created_at is missing or invalid

    const timestamp = Date.parse(e.created_at); // Try parsing the date
    if (isNaN(timestamp)) return acc; // Skip if not a valid date

    const date = new Date(timestamp).toISOString().split("T")[0]; // Format: YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Sort the labels (dates) for proper visualization
  const transactionLabels = Object.keys(transactionCounts).sort();
  const eventLabels = Object.keys(eventCounts).sort();

  const dataTransaction = {
    labels: transactionLabels,
    datasets: [
      {
        label: "Transactions",
        data: transactionLabels.map((date) => transactionCounts[date]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataEvent = {
    labels: eventLabels,
    datasets: [
      {
        label: "Events Created",
        data: eventLabels.map((date) => eventCounts[date]),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return {
    optionsEventChart,
    optionsTransactionChart,
    dataEvent,
    dataTransaction,
    onChangeOption,
    valueOption,
    optionEvents,
    optionTransaction,
    loading,
  };
}
