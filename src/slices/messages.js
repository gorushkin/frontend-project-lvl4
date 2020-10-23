import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelsActions } from './channels';
import { actions as errorsActions } from './errors';

import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessageSuccsess(state, { payload: { message } }) {
      state.messages.push(message);
    },
    getAllMessages(state, { payload: { messages } }) {
      state.messages = messages;
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccsess]: (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    },
  },
});

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ message, channelId, userName }, { dispatch }) => {
    const url = routes.channelMessagesPath(channelId);
    try {
      await axios.post(url, { data: { attributes: { message, userName } } });
    } catch (error) {
      dispatch(errorsActions.addError(error.message));
    }
  },
);

const actions = { ...slice.actions };
export { actions, addMessage };

export default slice.reducer;
