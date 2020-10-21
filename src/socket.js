import io from 'socket.io-client';

import { addMessageSuccsess } from './slices/messages';
import {
  addChannelSuccsess,
  removeChannelSuccsess,
  renameChannelSuccsess,
} from './slices/channels';

export default (store) => {
  const socket = io();

  socket.on('newMessage', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(addMessageSuccsess({ message: attributes }));
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
