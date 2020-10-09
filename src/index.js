// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import app from './app';

import '../assets/application.scss';

if (!cookies.get('name')) {
  const randomName = faker.fake('{{name.firstName}} {{name.lastName}}');
  cookies.set('name', randomName, { expires: 21 });
}

gon.userName = cookies.get('name');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon);
