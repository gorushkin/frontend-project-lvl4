import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages.messageList,
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const Messages = ({ messages, currentChannelId }) => (
  <div id="messages-box" className="chat-messages overflow-auto mb-3">
    {messages
      .filter((item) => item.channelId === currentChannelId)
      .map((item) => (
        <div key={item.id}>
          <b>
            {item.userName}
            :
          </b>
          {' '}
          {item.message}
        </div>
      ))}
  </div>
);

export default connect(mapStateToProps)(Messages);
