"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEventInterface } from "@/interfaces/event.interface";
import { panelGetEventDetail } from "@/helpers/handlers/apis/event.api";

export default function useEventDetailViewModel(id: string) {
    const [event, setEvent] = useState<IEventInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchEvent() {
            if (!id) return;
            try {
                const response = await panelGetEventDetail(Number(id));
                setEvent(response.data);
            } catch (error) {
                console.error("Failed to fetch event:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvent();
    }, [id]);

    return {
        event,
        isLoading,
        router,
    };
}
