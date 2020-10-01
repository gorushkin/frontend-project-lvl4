// @ts-check

/* eslint-disable react/jsx-filename-extension */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import App from './App';

import '../assets/application.scss';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels } = gon;

const root = document.getElementById('chat');
ReactDOM.render(<App channels={channels} />, root);
