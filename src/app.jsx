import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { getAllMessages } from './slices/messages';
import { getAllChannels } from './slices/channels';
import userNameContext from './context';
import store from './slices';
import socket from './socket';
import getUserName from './getUserName';

export default (gon) => {
  store.dispatch(getAllMessages(gon));
  store.dispatch(getAllChannels(gon));

  const userName = getUserName();

  socket(store);

  const root = document.getElementById('chat');

  ReactDOM.render(
    <Provider store={store}>
      <userNameContext.Provider value={userName}>
        <App />
      </userNameContext.Provider>
    </Provider>,
    root,
  );
};
