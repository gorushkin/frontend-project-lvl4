import React from 'react';

export default () => (
  <div className="mt-auto">
    <form novalidate="" className="" _lpchecked="1">
      <div className="form-group">
        <div className="input-group">
          <input name="body" aria-label="body" className="mr-2 form-control" value="" />
          <button aria-label="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="d-block invalid-feedback">&nbsp;</div>
        </div>
      </div>
    </form>
  </div>
);
