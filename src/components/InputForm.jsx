import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { addMessage } from '../redusers/messages';

const mapStateToProps = ({ channels, messages }) => {
  const props = {
    currentChannelId: channels.currentChannelId,
    userName: messages.userName,
  };
  return props;
};

const actionCreators = {
  addMessage,
};

const InputForm = (props) => {
  const { addMessage: addMessageAction, currentChannelId, userName } = props;

  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: (values, { resetForm }) => {
      addMessageAction(values.body, currentChannelId, userName);
      resetForm({ body: '' });
    },
  });

  return (
    <div className="mt-auto">
      <form onSubmit={formik.handleSubmit} noValidate="" className="" _lpchecked="1">
        <div className="form-group">
          <div className="input-group">
            <input
              id="message"
              onChange={formik.handleChange}
              name="body"
              aria-label="body"
              className="mr-2 form-control"
              value={formik.values.body}
            />
            <button aria-label="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
            <div className="d-block invalid-feedback">&nbsp;</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(InputForm);