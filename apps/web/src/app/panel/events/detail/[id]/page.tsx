"use client";

import { DisableInput } from "@/components/common/inputs/DisableInputField";
import { DisableTextArea } from "@/components/common/inputs/DisableTextarea";
import { formatCurrency } from "@/helpers/format.currency";
import { formatDate, formatTimeOnly } from "@/helpers/format.time";
import { panelGetEventDetail } from "@/helpers/handlers/apis/event.api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    params: Promise<{ id: number }>;
};

export default function PanelDetailEvent({ params }: Props) {
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const { id } = await params;
                const response = await panelGetEventDetail(id);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }

        fetchEvent();
    }, [params]);

    if (!event) return <p>Event not found</p>;

    return (
        <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <DisableInput label="Nama" value={event.name} />
                <DisableInput label="Host Name" value={event.host_name} />
                <DisableInput label="Date" value={formatDate(event.date)} />
                <div className="md:flex gap-2">
                    <DisableInput label="Start Time" value={formatTimeOnly(event.start_time)} />
                    <DisableInput label="End Time" value={formatTimeOnly(event.end_time)} />
                </div>
                <DisableInput label="City" value={event.city.name} />
                <DisableInput label="Category" value={event.event_category.name} />
                <DisableTextArea label="Address" value={event.address} />
                <DisableTextArea label="Description" value={event.description} />
                <DisableTextArea label="Term & Condition" value={event.term_condition} />
                <DisableInput label="Status" value={event.status} />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Image</label>
                <Image
                    width={400}
                    height={400}
                    src={event.image}
                    className="rounded object-cover mt-3"
                    alt="Event Image"
                />
            </div>

            <hr className="my-10 text-gray-50" />

            <div>
                {event.ticket_types.map((ticket: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center mt-3">
                        <div className="md:flex gap-4 w-full">
                            <DisableInput label="Ticket Name" value={ticket.name} />
                            <DisableInput label="Price" value={formatCurrency(ticket.price)} />
                            <DisableInput label="Quota" value={ticket.quota} />
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-10 text-gray-50" />

            <div className="flex justify-end">
                <Link
                    href={'/panel/events'}
                    className="bg-gray-50 border border-gray-300 text-gray-700  px-5 py-3 rounded mb-6"
                >
                    Back
                </Link>
            </div>
        </div>
    );
}
