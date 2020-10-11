import io from 'socket.io-client';

import { addMessageSuccsess } from './redusers/messages';
import {
  addChannelSuccsess,
  removeChannelSuccsess,
  renameChannelSuccsess,
} from './redusers/channels';

export default (store, gon) => {
  const socket = io();

  socket.on('newMessage', (data) => {
    const {
      data: { attributes },
    } = data;
    if (attributes.userName !== gon.userName) {
      store.dispatch(addMessageSuccsess({ message: attributes }));
    }
  });

  socket.on('newChannel', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(addChannelSuccsess({ channel: attributes }));
  });

  socket.on('removeChannel', (data) => {
    const {
      data: { id },
    } = data;
    store.dispatch(removeChannelSuccsess({ id }));
  });

  socket.on('renameChannel', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(renameChannelSuccsess({ channel: attributes }));
  });
};
