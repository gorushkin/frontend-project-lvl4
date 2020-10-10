import * as yup from 'yup';

export default (channels) => yup.object({
  name: yup
    .string()
    .required('Required!')
    .notOneOf(
      channels.map((item) => item.name),
      'Must be unique',
    )
    .min(3, 'Must be 3 to 20 characters')
    .max(20, 'Must be 3 to 20 characters'),
});
