import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import App from './components/App';
import userNameContext from './context';
import reducer, { actions } from './slices';
import { en, ru } from './locales';

export default async (gon) => {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: { en, ru },
    fallbackLng: 'en',
  });

  const store = configureStore({
    reducer,
  });

  store.dispatch(actions.getAllMessages(gon));
  store.dispatch(actions.getAllChannels(gon));

  if (!cookies.get('name')) {
    const randomName = faker.fake('{{name.firstName}} {{name.lastName}}');
    cookies.set('name', randomName, { expires: 21 });
  }

  const socket = io();

  socket.on('newMessage', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(actions.addMessageSuccsess({ message: attributes }));
  });

  socket.on('newChannel', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(actions.addChannelSuccsess({ channel: attributes }));
  });

  socket.on('removeChannel', (data) => {
    const {
      data: { id },
    } = data;
    store.dispatch(actions.removeChannelSuccsess({ id }));
  });

  socket.on('renameChannel', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(actions.renameChannelSuccsess({ channel: attributes }));
  });

  const userName = cookies.get('name');

  const root = document.getElementById('chat');

  ReactDOM.render(
    <Provider store={store}>
      <userNameContext.Provider value={userName}>
        <App />
      </userNameContext.Provider>
    </Provider>,
    root
  );
};
