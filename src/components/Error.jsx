import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { actions } from '../slices';

const Error = () => {
  const {
    errors: { isError, error },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Alert
      show={isError}
      onClose={() => dispatch(actions.removeError())}
      dismissible
      variant="danger"
    >
      {error}
    </Alert>
  );
};

export default Error;
