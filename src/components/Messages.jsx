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
      {messages.map((item) => <div><b>Name:</b>  {item}</div>)}
    </div>
  );
}

export default connect(mapStateToProps)(Messages);
