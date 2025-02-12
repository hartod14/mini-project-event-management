import { api_url } from "@/helpers/config"

export const getCategories = async () => {
    const res = await fetch(api_url + 'categories')

    const data = await res.json()
    return data
}