import React, { useContext } from 'react';

import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { addMessage } from '../redusers/messages';
import userNameContext from './context';

const mapStateToProps = ({ channels }) => {
  const props = {
    currentChannelId: channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessage,
};

const InputForm = ({ addMessage: addMessageAction, currentChannelId }) => {
  const userName = useContext(userNameContext);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={
          async (values, { resetForm }) => addMessageAction(values.body, currentChannelId, userName)
            .then(() => resetForm())
        }
      >
        {({ isSubmitting }) => (
          <Form noValidate="" className="" _lpchecked="1">
            <div className="form-group">
              <div className="input-group">
                <Field
                  disabled={isSubmitting}
                  id="message"
                  name="body"
                  aria-label="body"
                  className="mr-2 form-control"
                />
                <button
                  aria-label="submit"
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <div className="d-block invalid-feedback">&nbsp;</div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(InputForm);
