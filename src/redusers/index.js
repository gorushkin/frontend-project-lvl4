import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
  name: 'messages',
  initialState: ['one', 'two'],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
  },
});

export default messages.reducer;
export const { addMessage } = messages.actions;
