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
  },
});

export default channels.reducer;
export const { getAllChannels, changeChannel } = channels.actions;
