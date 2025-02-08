export interface IEventInterface {
    id: number
    event_category_id: number
    city_id?: number
    name: string
    host_name: string
    address: string
    description?: string
    term_condition?: string
    start_date: Date
    end_date: Date
    is_active: string
    image: string
    map_image?: string
    created_at: Date
    updated_at?: Date
}
