import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { actions } from '../slices';

const mapStateToProps = ({ errors }) => errors;

const Error = ({ text, isError, removeError: removeErrorAction }) => {
  if (!isError) return null;
  return (
    <Alert onClose={() => removeErrorAction()} dismissible variant="danger">
      {text}
    </Alert>
  );
};

export default connect(mapStateToProps, { removeError: actions.removeError })(Error);
