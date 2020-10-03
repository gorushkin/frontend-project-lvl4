import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import messages, { getAllMessages } from './redusers/messages';
import channels, { getAllChannels } from './redusers/channels';

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

  const root = document.getElementById('chat');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
};
