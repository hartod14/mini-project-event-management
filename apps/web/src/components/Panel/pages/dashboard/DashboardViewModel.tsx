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

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await panelGetDashboard()).data;
        setTransactions(data.transactions || []);
        setEvents(
          data.events.map((e: any) => ({
            id: e.id,
            created_at: e.name,
          })) || []
        );


        setTotalUsers(data.totalUsers || 0);
        setTotalTransactions(data.totalTransactions || 0);
        setTotalEarnings(data.totalEarnings || 0);
        setTotalEvents(data.totalEvents || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const [valueOption, setValueOption] = useState({
    transaction: "month",
    events: "month",
  });

  function onChangeOption(key: "transaction" | "events", value: string) {
    setValueOption((prev) => ({ ...prev, [key]: value }));
  }

  const optionTransaction = [
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Day", value: "day" },
  ];

  const optionEvents = [...optionTransaction];

  const optionsTransactionChart = { responsive: true };
  const optionsEventChart = { responsive: true };

  const formatDate = (dateString: string, filter: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    switch (filter) {
      case "year":
        return date.getFullYear().toString();
      case "month":
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      case "day":
      default:
        return date.toISOString().split("T")[0];
    }
  };

  const transactionCounts = transactions.reduce((acc: Record<string, number>, t) => {
    const formattedDate = formatDate(t.created_at, valueOption.transaction);
    if (!formattedDate) return acc;

    acc[formattedDate] = (acc[formattedDate] || 0) + t.total_price;
    return acc;
  }, {});

  const eventCounts = events.reduce((acc: Record<string, number>, e) => {
    const formattedDate = formatDate(e.created_at, valueOption.events);
    if (!formattedDate) return acc;

    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});

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
    totalUsers,
    totalTransactions,
    totalEarnings,
    totalEvents,
  };
}
