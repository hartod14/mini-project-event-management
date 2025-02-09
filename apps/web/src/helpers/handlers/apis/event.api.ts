import { api_url } from "@/helpers/config";

export const panelGetEvents = async (eventName: string, page: number, limit: number) => {
    const res = await fetch(api_url + `panel/events?search=${eventName}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data;
};