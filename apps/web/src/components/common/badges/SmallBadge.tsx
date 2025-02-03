"use client";

import { IStatusBadgeProps } from "@/interfaces/TicketInterface";

const statusStyles: Record<IStatusBadgeProps["status"], { bg: string; text: string; label: string }> = {
    waiting_for_payment: { bg: "bg-yellow-300", text: "text-yellow-700", label: "Waiting for Payment" },
    waiting_for_admin_confirmation: { bg: "bg-blue-300", text: "text-blue-700", label: "Waiting for Confirmation" },
    done: { bg: "bg-green-300", text: "text-green-700", label: "Done" },
    rejected: { bg: "bg-red-300", text: "text-red-700", label: "Rejected" },
    expired: { bg: "bg-gray-300", text: "text-gray-700", label: "Expired" },
    canceled: { bg: "bg-purple-300", text: "text-purple-700", label: "Canceled" },
};

export default function SmallBadge({ status }: IStatusBadgeProps) {
    const { bg, text, label } = statusStyles[status];

    return (
        <div className={`px-2 py-1 rounded w-fit mb-2 font-semibold text-xs ${bg} ${text}`}>
            {label}
        </div>
    );
}
