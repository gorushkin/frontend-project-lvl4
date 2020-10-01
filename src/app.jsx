import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './Channels';

export default (gon) => {
  const { channels } = gon;

  const root = document.getElementById('chat');
  ReactDOM.render(<Channels channels={channels} />, root);
};
