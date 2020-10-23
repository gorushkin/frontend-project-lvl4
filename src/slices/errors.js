import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
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

const actions = { ...slice.actions };

export { actions };
export default slice.reducer;
