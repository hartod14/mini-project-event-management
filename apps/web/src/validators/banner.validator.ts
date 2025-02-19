import * as Yup from 'yup';

export const storeBannerValidator = Yup.object({
  name: Yup.string().required('Banner name is required'),
  image: Yup.string().required('Banner Image is required'),
});
