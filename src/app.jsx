import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App';

export default (gon) => {
  // const store = configureStore({
  //   reducer: rootReduser,
  // });

  const root = document.getElementById('chat');
  ReactDOM.render(<App gon={gon} />, root);
};
