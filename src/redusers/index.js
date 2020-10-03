import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccsess(state, action) {
      state.push(action.payload.message);
    },
  },
});

export default messages.reducer;
export const { addMessageSuccsess, addMessageRequest, addMessageFailure } = messages.actions;

export const addMessage = (message) => async (dispatch) => {
  const url = routes.channelMessagesPath(1);
  const response = await axios.post(url, { data: { attributes: { message } } });
  dispatch(addMessageSuccsess({ message: response.data.data.attributes }));
};
