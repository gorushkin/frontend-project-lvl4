import cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import store, { actions } from './slices';
import {
  getAllChannels,
  addChannelSuccsess,
  removeChannelSuccsess,
  renameChannelSuccsess,
} from './slices/channels';

export default (gon) => {
  store.dispatch(actions.getAllMessages(gon));
  store.dispatch(getAllChannels(gon));

  if (!cookies.get('name')) {
    const randomName = faker.fake('{{name.firstName}} {{name.lastName}}');
    cookies.set('name', randomName, { expires: 21 });
  }

  const socket = io();

  socket.on('newMessage', (data) => {
    const {
      data: { attributes },
    } = data;
    store.dispatch(actions.addMessageSuccsess({ message: attributes }));
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
