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
      console.log('payload.channel: ', payload.channel);
      state.channels.push({ id, name, removable });
    },
  },
});

export default channels.reducer;
export const { getAllChannels, changeChannel, addChannelSuccsess } = channels.actions;

export const addChannel = (name) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};
