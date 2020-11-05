import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as errorsActions } from './errors';

import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: '',
  },
  reducers: {
    getAllChannels(state, { payload: { channels, currentChannelId } }) {
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    changeChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    addChannelSuccsess(
      state,
      { payload: { channel: { id, name, removable } } },
    ) {
      state.channels.push({ id, name, removable });
    },
    removeChannelSuccsess(state, { payload: { id } }) {
      const channels = state.channels.filter((item) => item.id !== id);
      state.channels = channels;
    },
    renameChannelSuccsess(
      state,
      { payload: { channel: { name, id } } },
    ) {
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
  },
});

const addChannel = createAsyncThunk('channels/addChannel', async (name, { dispatch }) => {
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data: { attributes: { name } } });
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
});

const removeChannel = createAsyncThunk('channels/removeChannel', async (id, { dispatch }) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
});

const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }, { dispatch }) => {
    const url = routes.channelPath(id);
    try {
      await axios.patch(url, { data: { attributes: { name } } });
    } catch (error) {
      dispatch(errorsActions.addError(error.message));
    }
  },
);

const actions = { ...slice.actions };
const asyncActions = { addChannel, removeChannel, renameChannel };
export { actions, asyncActions };

export default slice.reducer;
