import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const channels = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    getAllChannels(state, { payload: { channels } }) {
      return channels;
    },
  },
});

export default channels.reducer;
export const { getAllChannels } = channels.actions;

export const addMessage = (message) => async (dispatch) => {
  const url = routes.channelMessagesPath(1);
  const response = await axios.post(url, { data: { attributes: { message } } });
  dispatch(addMessageSuccsess({ message: response.data.data.attributes }));
};
