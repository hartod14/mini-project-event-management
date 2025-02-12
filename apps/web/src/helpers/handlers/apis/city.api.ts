import { api_url } from "@/helpers/config"

export const getCities = async () => {
    const res = await fetch(api_url + `cities`)
    
    const data = await res.json()
    return data
}