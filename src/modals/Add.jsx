import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { addChannel } from '../redusers/channels';

const actionCreators = {
  addChannelAction: addChannel,
};

const AddChannelModal = (props) => {
  const { onHide, addChannelAction } = props;

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: ({ name }) => {
      addChannelAction(name);
      onHide();
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add channel</Modal.Title>
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
              <button onClick={onHide} type="button" className="mr-2 btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actionCreators)(AddChannelModal);
