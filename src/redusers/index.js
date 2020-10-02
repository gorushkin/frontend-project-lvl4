import { combineReducers } from 'redux';

const messages = (state = ['one'], action) => {
  switch (action.type) {
    case 'Add_MESSAGE': {
      const { value } = action.payload;
      return [...state, value];
    }
    default:
      return state;
  }
}

export default combineReducers({
  messages,
});