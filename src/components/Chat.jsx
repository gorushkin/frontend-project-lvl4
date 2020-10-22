import React from 'react';
import InputForm from './InputForm';
import Messages from './Messages';
import Error from './Error';

export default () => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <Error />
      <Messages />
      <InputForm />
    </div>
  </div>
);
