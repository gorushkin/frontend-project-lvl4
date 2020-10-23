import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { asyncActions } from '../slices';

const AddChannelModal = ({ onHide, removeChannel, item: { id } }) => {
  const removeChannelHandler = () => {
    removeChannel(id);
    onHide();
  };

  return (
    <Modal onHide={onHide} show restoreFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button onClick={removeChannelHandler} variant="danger">
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, { removeChannel: asyncActions.removeChannel })(AddChannelModal);
