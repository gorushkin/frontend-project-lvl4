import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import redusers from './redusers';

export default (gon) => {
  const store = createStore(redusers);

  const root = document.getElementById('chat');
  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} />
    </Provider>,
    root
  );
};
