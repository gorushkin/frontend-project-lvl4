import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import errors from './errors';

const rootReducer = combineReducers({
  messages,
  channels,
  errors,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
