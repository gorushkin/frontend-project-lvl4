import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';

const rootReducer = combineReducers({
  messages,
  channels,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
