import React from 'react';

const channel = ({ id, name }) => (
  <li key={id} className="nav-item">
    <button
      type="button"
      className="nav-link btn-block mb-2 text-left btn nav-link btn-block mb-2 text-left btn btn-light"
    >
      {name}
    </button>
  </li>
);

export default ({ channels }) => (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Channels</span>
      <button type="button" className="ml-auto p-0 btn btn-link">
        +
      </button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((item) => channel(item))}
    </ul>
  </div>
);
