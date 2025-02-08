import { api_url } from "@/helpers/config";

export const panelGetEvents = async (eventName: string = '') => {
    const res = await fetch(api_url + "panel/events?search=" + eventName);
    const data = await res.json();
    return data;
};