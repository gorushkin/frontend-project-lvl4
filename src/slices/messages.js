import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelsActions } from './channels';
import { actions as errorsActions } from './errors';

import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messageList: [],
  },
  reducers: {
    addMessageSuccsess(state, { payload: { message } }) {
      state.messageList.push(message);
    },
    getAllMessages(state, { payload: { messages } }) {
      state.messageList = messages;
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccsess]: (state, { payload }) => {
      const { id } = payload;
      state.messageList = state.messageList.filter(({ channelId }) => channelId !== id);
    },
  },
});

const addMessage = createAsyncThunk(
  'addmessage',
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
