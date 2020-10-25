import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  const messageFrame = useRef();

  useEffect(() => {
    const frameHeight = messageFrame.current.scrollHeight;
    messageFrame.current.scrollTo(0, frameHeight);
  }, [messages, currentChannelId]);

  return (
    <div
      ref={messageFrame}
      id="messages-box"
      className="chat-messages overflow-auto mb-3"
    >
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
