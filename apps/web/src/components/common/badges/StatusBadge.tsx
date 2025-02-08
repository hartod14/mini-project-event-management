"use client";

import { IStatusBadgeProps } from "@/interfaces/ticket.interface";

// Define the color mappings and labels for each status
const statusStyles: { [key in IStatusBadgeProps["status"]]: { bg: string; dot: string; text: string; textColor: string } } = {
    waiting_for_payment: { bg: "bg-yellow-300", dot: "bg-yellow-700", text: "Waiting for Payment", textColor: "text-yellow-700" },
    waiting_for_admin_confirmation: { bg: "bg-blue-300", dot: "bg-blue-700", text: "Waiting for Admin Confirmation", textColor: "text-blue-700" },
    done: { bg: "bg-green-300", dot: "bg-green-700", text: "Done", textColor: "text-green-700" },
    rejected: { bg: "bg-red-300", dot: "bg-red-700", text: "Rejected", textColor: "text-red-700" },
    expired: { bg: "bg-gray-300", dot: "bg-gray-700", text: "Expired", textColor: "text-gray-700" },
    canceled: { bg: "bg-orange-300", dot: "bg-orange-700", text: "Canceled", textColor: "text-orange-700" },
};

export default function StatusBadge({ status }: IStatusBadgeProps) {
    const { bg, dot, text, textColor } = statusStyles[status];

    return (
        <div className={`flex items-center gap-3 ${bg} px-5 py-4 rounded`}>
            <div className={`w-3 h-3 rounded-full ${dot}`}></div>
            <p className={`${textColor} font-semibold`}>{text}</p>
        </div>
    );
}
