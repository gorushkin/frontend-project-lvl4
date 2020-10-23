import React, { useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions } from '../slices';
import userNameContext from '../context';

const InputForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { addMessage } = asyncActions;
  const dispatch = useDispatch();
  const userName = useContext(userNameContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: (values, { resetForm }) => dispatch(
      addMessage({
        message: values.body,
        channelId: currentChannelId,
        userName,
      }),
    )
      .then(() => resetForm())
      .then(() => inputRef.current.focus()),
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
              ref={inputRef}
              aria-label="body"
              className="mr-2 form-control"
              value={formik.values.body}
              disabled={formik.isSubmitting}
            />
            <button
              disabled={formik.isSubmitting}
              aria-label="submit"
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
            <div className="d-block invalid-feedback">&nbsp;</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
