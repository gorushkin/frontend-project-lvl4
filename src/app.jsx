import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { getAllMessages } from './slices/messages';
import { getAllChannels } from './slices/channels';
import userName from './context';
import store from './slices';
import socket from './socket';

export default (gon) => {
  store.dispatch(getAllMessages(gon));
  store.dispatch(getAllChannels(gon));

  socket(store, gon);

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
