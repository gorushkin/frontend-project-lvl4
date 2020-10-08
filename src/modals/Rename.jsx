import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { renameChannel } from '../redusers/channels';

const actionCreators = {
  renameChannelAction: renameChannel,
};

const AddChannelModal = (props) => {
  const { onHide, renameChannelAction, item } = props;
  const { id, name } = item;

  const formik = useFormik({
    initialValues: { name },
    onSubmit: ({ name }) => {
      renameChannelAction(name, id);
      onHide();
    },
  });

  return (
    <Modal onHide={onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form noValidate="" className="" _lpchecked="1" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              onChange={formik.handleChange}
              required
              name="name"
              className="mb-2"
              value={formik.values.name}
            />
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} type="button" variant="secondary" className="mr-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actionCreators)(AddChannelModal);
