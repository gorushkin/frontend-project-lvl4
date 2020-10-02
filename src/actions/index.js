const addMessage = (value) => ({
  type: 'Add_MESSAGE',
  payload: {
    value,
  },
});

export default addMessage;