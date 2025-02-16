import { api_url } from "@/helpers/config";
import { ICreateEventInterface, IEventInterface } from "@/interfaces/event.interface";

export const panelGetEvents = async (eventName: string, page: number, limit: number) => {
    const res = await fetch(api_url + `panel/events?search=${eventName}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data;
};

export const panelGetEventDetail = async (id: number) => {
    const res = await fetch(api_url + `panel/events/${id}`);

    const data = await res.json()


    return data;
}

export const createEvent = async (newEvent: ICreateEventInterface) => {
    try {
        const res = await fetch(api_url + `panel/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.message || "Something went wrong" };
        }

        return data;
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Network error" };
    }
};

export const updateEvent = async (id: number, updatedEvent: ICreateEventInterface) => {
    try {
        const res = await fetch(api_url + `panel/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.message || "Something went wrong" };
        }

        return data;
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Network error" };
    }
};

export const deleteEvent = async (id: number) => {
    try {
        const res = await fetch(`${api_url}panel/events/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const data = await res.json();
            return { error: data.message || "Something went wrong" };
        }

        return { success: true };
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Network error" };
    }
};
