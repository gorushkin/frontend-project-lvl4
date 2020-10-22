import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { addError } from './errors';

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
      state,
      {
        payload: {
          channel: { id, name, removable },
        },
      },
    ) {
      state.channels.push({ id, name, removable });
    },
    removeChannelSuccsess(state, { payload: { id } }) {
      const updatedChannelsList = state.channels.filter((item) => item.id !== id);
      state.channels = updatedChannelsList;
    },
    renameChannelSuccsess(
      state,
      {
        payload: {
          channel: { name, id },
        },
      },
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

export const addChannel = createAsyncThunk('addchannl', async (name, { dispatch }) => {
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data: { attributes: { name } } });
  } catch (error) {
    dispatch(addError(error.message));
  }
});

export const removeChannel = createAsyncThunk('removeChannel', async (id, { dispatch }) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
  } catch (error) {
    dispatch(addError(error.message));
  }
});

export const renameChannel = createAsyncThunk(
  'renamechannel',
  async ({ name, id }, { dispatch }) => {
    const url = routes.channelPath(id);
    try {
      await axios.patch(url, { data: { attributes: { name } } });
    } catch (error) {
      dispatch(addError(error.message));
    }
  },
);
