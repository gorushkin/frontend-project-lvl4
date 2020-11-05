import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const currentChannelMessages = createSelector(
  (state) => state.messages.messages,
  (state) => state.channels.currentChannelId,
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

const Messages = () => {
  const messages = useSelector(currentChannelMessages);

  const messageFrame = useRef();

  useEffect(() => {
    const frameHeight = messageFrame.current.scrollHeight;
    messageFrame.current.scrollTo(0, frameHeight);
  }, [messages]);

  return (
    <div ref={messageFrame} id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map((item) => (
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
