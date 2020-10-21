import cookies from 'js-cookie';
import faker from 'faker';

export default () => {
  if (!cookies.get('name')) {
    const randomName = faker.fake('{{name.firstName}} {{name.lastName}}');
    cookies.set('name', randomName, { expires: 21 });
  }

  return cookies.get('name');
};
