import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  },
});

export default channels.reducer;
export const {
  getAllChannels,
  changeChannel,
  addChannelSuccsess,
  removeChannelSuccsess,
} = channels.actions;

export const addChannel = (name) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};

export const removeChannel = (id) => async () => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};
