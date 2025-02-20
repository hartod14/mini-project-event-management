import * as Yup from 'yup';

export const storeVoucherValidator = Yup.object({
  name: Yup.string()
    .max(100, 'Voucher name cannot exceed 100 characters')
    .required('Voucher name is required'),
  price: Yup.number().required('Voucher name is required'),
  start_date: Yup.date().required('Voucher start_date is required'),
  end_date: Yup.date().required('Voucher end_date is required'),

  events: Yup.array()
    .of(Yup.number().required('Events is required'))
    .min(1, 'At least one ticket is required'),
});
