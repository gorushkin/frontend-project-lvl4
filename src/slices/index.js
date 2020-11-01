import { combineReducers } from '@reduxjs/toolkit';
import messages, { actions as messagesActions, addMessage } from './messages';
import channels, {
  actions as channelsActions,
  asyncActions as asyncChannelsActions,
} from './channels';
import errors, { actions as errorsActions } from './errors';

export default combineReducers({
  messages,
  channels,
  errors,
});

const actions = { ...messagesActions, ...channelsActions, ...errorsActions };
const asyncActions = {
  addMessage,
  ...asyncChannelsActions,
};

export { actions, asyncActions };
