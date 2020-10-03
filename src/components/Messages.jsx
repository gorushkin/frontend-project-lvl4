import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const Messages = (props) => {
  const { messages } = props;
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map((item) => (
        <div key={item.id}>
          <b>Name:</b>
          {' '}
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Messages);
