import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const messages = createSlice({
  name: 'messages',
  initialState: {
    messageList: [],
    userName: '',
  },
  reducers: {
    addMessageSuccsess(state, action) {
      state.messageList.push(action.payload.message);
    },
    getAllMessages(state, { payload: { messages, userName } }) {
      state.messageList = messages;
      state.userName = userName;
    },
  },
});

export default messages.reducer;
export const { addMessageSuccsess, getAllMessages } = messages.actions;

export const addMessage = (message, channelId, userName) => async (dispatch) => {
  const url = routes.channelMessagesPath(channelId);
  const response = await axios.post(url, { data: { attributes: { message, userName } } });
  dispatch(addMessageSuccsess({ message: response.data.data.attributes }));
};
