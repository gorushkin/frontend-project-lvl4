import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import messages from './redusers';

export default (gon) => {
  const rootReducer = combineReducers({
    messages,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  const root = document.getElementById('chat');
  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} />
    </Provider>,
    root,
  );
};
