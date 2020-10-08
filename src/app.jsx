import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import messages, { getAllMessages, addMessageSuccsess } from './redusers/messages';
import channels, { getAllChannels, addChannelSuccsess, removeChannelSuccsess } from './redusers/channels';
import userName from './context';
import socket from './socket';

export default (gon) => {
  const rootReducer = combineReducers({
    messages,
    channels,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  store.dispatch(getAllMessages(gon));
  store.dispatch(getAllChannels(gon));

  socket.on('newMessage', (data) => {
    const {
      data: { attributes },
    } = data;
    if (attributes.userName !== gon.userName) {
      store.dispatch(addMessageSuccsess({ message: attributes }));
    }
  });

  socket.on('newChannel', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(addChannelSuccsess({ channel: attributes }));
  });

  socket.on('removeChannel', (data) => {
    const {
      data: { id },
    } = data;
    store.dispatch(removeChannelSuccsess({ id }));
  });

  const root = document.getElementById('chat');

  ReactDOM.render(
    <Provider store={store}>
      <userName.Provider value={gon.userName}>
        <App />
      </userName.Provider>
    </Provider>,
    root,
  );
};
