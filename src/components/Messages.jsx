import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
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
};

export default Messages;
