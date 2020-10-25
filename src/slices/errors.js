import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'errors',
  initialState: {
    error: '',
    isError: false,
  },
  reducers: {
    addError(state, { payload }) {
      state.error = payload;
      state.isError = true;
    },
    removeError(state) {
      state.error = '';
      state.isError = false;
    },
  },
});

const actions = { ...slice.actions };

export { actions };
export default slice.reducer;
