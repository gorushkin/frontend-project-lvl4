import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { asyncActions } from '../slices';
import validationSchema from './channelNameValidation';

const AddChannelModal = ({ onHide, addChannel, item }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema(item.channels),
    onSubmit: ({ name }) => {
      addChannel(name);
      onHide();
    },
  });

  return (
    <Modal restoreFocus={false} onHide={onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="" _lpchecked="1" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              onChange={formik.handleChange}
              ref={inputRef}
              name="name"
              className="mb-2"
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            {formik.errors.name ? (
              <div className="d-block mb-2 invalid-feedback">{formik.errors.name}</div>
            ) : null}
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

export default connect(null, { addChannel: asyncActions.addChannel })(AddChannelModal);
