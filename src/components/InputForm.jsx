import React from 'react';
import { useFormik } from 'formik';

const InputForm = () => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: (values) => {
      console.log(values.body);
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

export default InputForm;
