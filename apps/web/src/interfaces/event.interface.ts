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


export interface IEventTransactionInterface {
    id: number;
    event_id: number | number;
    user_id: number;
    voucher_event_id: null | number;
    coupon_user_id: null | number;
    payment_method_id: 1;
    transaction_number: string;
    total_price: string;
    point_used: null;
    payment_proof: null;
    payment_date: null;
    payment_status: string;
    created_at: string;
    updated_at: string;
    transaction_tickets: {
      ticket_type: {
        id: number
        event_id: number
        name: string
        price: string
        quota: number
        purchaseable_limit_time: string
        created_at: string
        updated_at: string
      };
    }[];
    event: IEventInterface;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      password: string;
      profile_photo: string;
      referral_code: string;
      point: string;
      point_expire: null | string;
      is_verified: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
  }
  