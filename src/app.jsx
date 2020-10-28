import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import App from './components/App';
import userNameContext from './context';
import store from './slices';
import initApp from './init.js';

import './i18n';

export default async (gon) => {
  initApp(gon);

  const userName = cookies.get('name');

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
