import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../redusers/channels';

const actionCreators = {
  removeChannelAction: removeChannel,
};

const AddChannelModal = (props) => {
  const { onHide, removeChannelAction, item } = props;
  const { id } = item;

  const removeChannelHandler = (id) => () => {
    removeChannelAction(id);
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button onClick={removeChannelHandler(id)} variant="danger">
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actionCreators)(AddChannelModal);
