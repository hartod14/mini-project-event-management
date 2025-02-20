export interface ICreateVoucherInterface {
  name: string;
  price: number;
  start_date: string;
  end_date: string;
  events: number[];
}

export interface IVoucherInterface {
  name: string;
  price: number;
  start_date: string;
  end_date: string;
  id:number
}

export interface IVoucherDetailInterface extends IVoucherInterface {
    voucher_events
    : {
    id: number;
    event_id: number;
    voucher_id: number;
  }[];
}
