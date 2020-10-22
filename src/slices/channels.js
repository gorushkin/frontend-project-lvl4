import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    getAllChannels(state, { payload: { channels: channelsList, currentChannelId } }) {
      state.channels = channelsList;
      state.currentChannelId = currentChannelId;
    },
    changeChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    addChannelSuccsess(
      state, { payload: { channel: { id, name, removable } } },
    ) {
      state.channels.push({ id, name, removable });
    },
    removeChannelSuccsess(state, { payload: { id } }) {
      const updatedChannelsList = state.channels.filter((item) => item.id !== id);
      state.channels = updatedChannelsList;
    },
    renameChannelSuccsess(
      state, { payload: { channel: { name, id } } },
    ) {
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

export const addChannel = createAsyncThunk('addchannl', async (name) => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
});

export const removeChannel = createAsyncThunk('removeChannel', async (id) => {
  const url = routes.channelPath(id);
  await axios.delete(url);
});

export const renameChannel = createAsyncThunk('renamechannel', async ({ name, id }) => {
  const url = routes.channelPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
});
