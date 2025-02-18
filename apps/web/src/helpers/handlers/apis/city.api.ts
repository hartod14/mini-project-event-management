import { api_url } from "@/helpers/config"
import { api } from "./_api";
import { getAccessToken } from "./auth";

export const getCities = async () => {
    return await api(
        `/cities`,
        "GET",
        undefined
    );
}