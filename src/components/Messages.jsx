import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const messageList = useMemo(() => messages
    .filter(({ channelId }) => channelId === currentChannelId));

  const messageFrame = useRef();

  useEffect(() => {
    const frameHeight = messageFrame.current.scrollHeight;
    messageFrame.current.scrollTo(0, frameHeight);
  }, [messages, currentChannelId]);

  return (
    <div ref={messageFrame} id="messages-box" className="chat-messages overflow-auto mb-3">
      {messageList.map((item) => (
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
