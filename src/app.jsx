import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import messages, { getAllMessages, addMessageSuccsess } from './redusers/messages';
import channels, { getAllChannels } from './redusers/channels';
import userName from './components/context';
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
