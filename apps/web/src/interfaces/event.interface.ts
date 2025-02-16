export interface IEventInterface {
    id: number
    event_category_id: number
    event_category: {
        name: string
    }
    city_id?: number
    city: {
        name: string
    }
    ticket_types: {
        id: number,
        name: string,
        price?: number,
        quota?: number,
        purchaseable_limit_time: number,
    }[]
    name: string
    host_name: string
    address: string
    description: string
    term_condition: string
    date: Date
    start_time: Date
    end_time: Date
    status: string
    image: string
    created_at: Date
    updated_at?: Date
}

export interface ICreateEventInterface {
    id?: string
    event_category_id: string
    city_id: string
    name: string
    host_name: string
    address: string
    description?: string
    term_condition?: string
    date: string
    start_time: string
    end_time: string
    status: string
    image: string
}
