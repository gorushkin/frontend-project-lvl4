import { configureStore, combineReducers } from '@reduxjs/toolkit';
import messages, { actions as messagesActions, addMessage } from './messages';
import channels, { actions as channelsActions, asyncActions as asyncChannelsActions } from './channels';
import errors, { actions as errorsActions } from './errors';

const rootReducer = combineReducers({
  messages,
  channels,
  errors,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

const actions = { ...messagesActions, ...channelsActions, ...errorsActions };
const asyncActions = {
  addMessage,
  ...asyncChannelsActions,
};

export { actions, asyncActions };
