"use server"
import { api_url, auth_secret } from "@/helpers/config";
import { ICreateEventInterface, IEventInterface } from "@/interfaces/event.interface";
import { api } from "./_api";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getAccessToken } from "./auth";

// export const panelGetEvents = async (eventName: string, page: number, limit: number) => {
//     const res = await fetch(api_url + `panel/events?search=${eventName}&page=${page}&limit=${limit}`);
//     const data = await res.json();
//     return data;
// };
export const panelGetEvents = async (
    eventName: string,
    page: number,
    limit: number,
) => {

    return await api(
        `/panel/events?search=${encodeURIComponent(eventName)}&page=${page}&limit=${limit}`,
        "GET",
        undefined,
        await getAccessToken()
    );
};


export const panelGetEventDetail = async (id: number) => {
    return await api(
        `/panel/events/${id}`,
        "GET",
        undefined,
        await getAccessToken()
    );
}

export const createEvent = async (newEvent: Record<string, unknown>) => {
    try {
        return await api(
            "/panel/events",
            "POST",
            {
                body: newEvent,
                contentType: "application/json"
            },
            await getAccessToken()
        );
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Network error" };
    }
};

export const updateEvent = async (id: number, updatedEvent: Record<string, unknown>) => {
    try {
        return await api(
            `/panel/events/${id}`,
            "PUT",
            {
                body: updatedEvent,
                contentType: "application/json"
            },
            await getAccessToken()
        );
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Network error" };
    }
};

// export const deleteEvent = async (id: number) => {
//     try {
//         const res = await fetch(`${api_url}panel/events/${id}`, {
//             method: "DELETE",
//         });

//         if (!res.ok) {
//             const data = await res.json();
//             return { error: data.message || "Something went wrong" };
//         }

//         return { success: true };
//     } catch (err) {
//         return { error: err instanceof Error ? err.message : "Network error" };
//     }
// };

export const deleteEvent = async (id: number) => {
    try {

        return await api(
            `/panel/events/${id}`,
            "DELETE",
            undefined,
            await getAccessToken()
        );

    } catch (error) {
        console.error("Delete failed:", error);
        return { error: error instanceof Error ? error.message : "Network error" };
    }
};