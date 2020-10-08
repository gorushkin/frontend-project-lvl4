import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannelSuccsess } from './channels';

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
    getAllMessages(state, { payload: { messages } }) {
      state.messageList = messages;
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

export const addMessage = (message, channelId, userName) => async (dispatch) => {
  const url = routes.channelMessagesPath(channelId);
  const response = await axios.post(url, { data: { attributes: { message, userName } } });
  dispatch(addMessageSuccsess({ message: response.data.data.attributes }));
};
