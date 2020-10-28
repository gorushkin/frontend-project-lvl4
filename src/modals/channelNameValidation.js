import * as yup from 'yup';

export default (channels) => yup.object({
  name: yup
    .string()
    .required('blankChannelName')
    .notOneOf(
      channels.map((item) => item.name),
      'unique',
    )
    .min(3, 'shortChannelName')
    .max(20, 'longChannelName'),
});
