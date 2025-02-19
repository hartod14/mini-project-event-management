import * as Yup from 'yup';

export const storeFaqValidator = Yup.object({
  question: Yup.string()
    .max(100, 'Faq question cannot exceed 100 characters')
    .required('Faq question is required'),
  answer: Yup.string().required('Faq answer is required'),
});
