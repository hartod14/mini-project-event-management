import { api_url } from "@/helpers/config";
import { ICreateEventInterface, IEventInterface } from "@/interfaces/event.interface";

export const panelGetEvents = async (eventName: string, page: number, limit: number) => {
    const res = await fetch(api_url + `panel/events?search=${eventName}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data;
};

export const createEvent = async (newEvent: ICreateEventInterface) => {
    const res = await fetch(api_url + `panel/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    }).then(() => 'New event has been createde').catch((err) => (err instanceof Error ? { error: err.message } : err));


    return res
}