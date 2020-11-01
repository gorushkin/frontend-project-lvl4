// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './init';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app();
