import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannelSuccsess } from './channels';
import { addError } from './errors';

import routes from '../routes';

const messages = createSlice({
  name: 'messages',
  initialState: {
    messageList: [],
  },
  reducers: {
    addMessageSuccsess(state, { payload: { message } }) {
      state.messageList.push(message);
    },
    getAllMessages(state, { payload: { messages: allmessages } }) {
      state.messageList = allmessages;
    },
  },
  extraReducers: {
    [removeChannelSuccsess]: (state, { payload }) => {
      const { id } = payload;
      state.messageList = state.messageList.filter(({ channelId }) => channelId !== id);
    },
  },
});

export default messages.reducer;
export const {
  addMessageFromSocket,
  addMessageSuccsess,
  getAllMessages,
  removeMessages,
} = messages.actions;

export const addMessage = createAsyncThunk(
  'addmessage',
  async ({ message, channelId, userName }, { dispatch }) => {
    const url = routes.channelMessagesPath(channelId);
    try {
      await axios.post(url, { data: { attributes: { message, userName } } });
    } catch (error) {
      dispatch(addError(error.message));
    }
  },
);
