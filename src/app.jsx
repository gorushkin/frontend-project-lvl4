import React from 'react';
import ReactDOM from 'react-dom';
// import Channels from './components/Channels';
import App from './components/App';

export default (gon) => {
  const root = document.getElementById('chat');
  ReactDOM.render(<App gon={gon} />, root);
};
