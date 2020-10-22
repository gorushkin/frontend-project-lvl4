import { createSlice } from '@reduxjs/toolkit';

const errors = createSlice({
  name: 'errors',
  initialState: {
    text: '',
    isError: false,
  },
  reducers: {
    addError(state, { payload }) {
      state.text = payload;
      state.isError = true;
    },
    removeError(state) {
      state.text = '';
      state.isError = false;
    },
  },
});

export default errors.reducer;
export const { addError, removeError } = errors.actions;
