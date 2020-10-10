import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { renameChannel } from '../redusers/channels';
import validationSchema from './channelNameValidation';

const actionCreators = {
  renameChannelAction: renameChannel,
};

const AddChannelModal = ({ onHide, renameChannelAction, item }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  const { id, name } = item;

  const formik = useFormik({
    initialValues: { name },
    validationSchema: validationSchema(item.channels),
    onSubmit: (values) => {
      renameChannelAction(values.name, id);
      onHide();
    },
  });

  return (
    <Modal onHide={onHide} show restoreFocus={false}>
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
              ref={inputRef}
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

export default connect(null, actionCreators)(AddChannelModal);
