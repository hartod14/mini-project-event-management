import * as Yup from 'yup';
export const companyInformationValidator = Yup.object({
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().min(11).required('Phone Number is required'),
  address: Yup.string().required('Address is required'),
  about_us: Yup.string().required('About Us is required'),
  
});
