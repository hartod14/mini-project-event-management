import { api_url } from "@/helpers/config"
import { api } from "./_api"
import { getAccessToken } from "./auth"


export const getCategories = async () => {
    return await api(
        `/categories`,
        "GET",
        undefined
    );
}