import * as Yup from 'yup';

export const loginValidator = Yup.object({
  email: Yup.string().email().required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
});

export const userValidator = Yup.object({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  email: Yup.string().email().required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
});
