import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import routes from '../routes';

const channels = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: '',
  },
  reducers: {
    getAllChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    changeChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    addChannelSuccsess(state, { payload }) {
      const { id, name, removable } = payload.channel;
      state.channels.push({ id, name, removable });
    },
    removeChannelSuccsess(state, { payload }) {
      const { id } = payload;
      const updatedChannelsList = state.channels.filter((item) => item.id !== id);
      state.channels = updatedChannelsList;
    },
    renameChannelSuccsess(state, { payload }) {
      const { name, id } = payload.channel;
      const itemIndex = _.findIndex(state.channels, { id });
      state.channels[itemIndex] = { ...state.channels[itemIndex], name };
    },
  },
});

export default channels.reducer;
export const {
  getAllChannels,
  changeChannel,
  addChannelSuccsess,
  removeChannelSuccsess,
  renameChannelSuccsess,
} = channels.actions;

export const addChannel = (name) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};

export const removeChannel = (id) => async () => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};

export const renameChannel = (name, id) => async () => {
  const url = routes.channelPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
};
