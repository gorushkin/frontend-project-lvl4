import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages, { actions as messagesActions, addMessage } from './messages';
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

const actions = { ...messagesActions };
const asyncActions = { addMessage };

export { actions, asyncActions };
