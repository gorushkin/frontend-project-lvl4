import React from 'react';
import InputForm from './InputForm';
import Messages from './Messages';

export default (props) => {
  const { handler } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <InputForm />
      </div>
    </div>
  );
};
