import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
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
      {
        payload: {
          channel: { id, name, removable },
        },
      },
    ) {
      state.channels.push({ id, name, removable });
    },
    removeChannelSuccsess(state, { payload: { id } }) {
      const channels = state.channels.filter((item) => item.id !== id);
      state.channels = channels;
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

const addChannel = createAsyncThunk('addchannl', async (name, { dispatch }) => {
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data: { attributes: { name } } });
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
});

const removeChannel = createAsyncThunk('removeChannel', async (id, { dispatch }) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
});

const renameChannel = createAsyncThunk(
  'renamechannel',
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
