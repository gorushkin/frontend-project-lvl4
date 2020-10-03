import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const messages = createSlice({
  name: 'messages',
  initialState: ['one', 'two'],
  reducers: {
    addMessageSuccsess(state, action) {
      state.push(action.payload);
    },
    addMessageRequest(state, action) {
      state = action.payload;
    },
    addMessageFailure(state, action) {
      state = action.payload;
    },
  },
});

export default messages.reducer;
export const { addMessageSuccsess, addMessageRequest, addMessageFailure } = messages.actions;

export const addMessage = (e) => async (dispatch) => {
  // dispatch(addMessageRequest());
  console.log(e);
  try {
    const url = routes.channelMessagesPath(1);
    console.log('url: ', url);
    const response = await axios.post(url);
    console.log('response: ', response);
    // dispatch(addMessageSuccsess({ task: response.data }));
  } catch (e) {
    // dispatch(addMessageFailure());
    console.log(e);
    // throw e;
  }
};
