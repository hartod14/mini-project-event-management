export interface ITransactionInterface {
    id: number
    event_id: number
    event: {
        name: string
        date: string
        start_time: string
        end_time: string
        city: {
            name: string
        }
    }
    user_id: number
    user: {
        name: string
    }
    voucher_event_id: number
    voucher_event: {
        voucher: {
            name: string
            price: number
        }
    }
    coupon_user_id: number
    coupon_user: {
        coupon: {
            name: string
            price: number
        }
    }
    payment_method_id: number
    payment_method: {
        account_name: string
        account_number: string
    }
    transaction_number: string
    total_price: number
    point_used: number
    payment_proof: string
    payment_date: string
    payment_status: string
    created_at: Date
    updated_at?: Date
    transaction_tickets: {
        ticket_type: {
            name: string
            price: number
        }
    }[]
    grouped_tickets?: any
    total_price_tickets: number
}

export interface ICreateTransactionInterface {
    id?: string
    event_id: number
    user_id: number
    voucher_event_id: number
    coupon_user_id: number
    payment_method_id: number
    transaction_number: string
    total_price: number
    point_used: number
    payment_proof: string
    payment_date: string
    payment_status: string
}
