import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { changeChannel, addChannel } from '../redusers/channels';
import getModals from '../modals';

const mapStateToProps = ({ channels }) => {
  const props = {
    channels: channels.channels,
    currentChannelId: channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
  changeChannel,
};

const channel = ({ id, name }, currentChannelId, changeChannel) => {
  const btnClass = cn('nav-link btn-block mb-2 text-left btn', {
    'btn-primary': currentChannelId === id,
    'btn-light': currentChannelId !== id,
  });

  const clickHandler = (id) => () => {
    changeChannel({ id });
  };

  return (
    <li key={id} className="nav-item">
      <button onClick={clickHandler(id)} type="button" className={btnClass}>
        {name}
      </button>
    </li>
  );
};

const renderModal = ({ type }, hideModal) => {
  if (!type) {
    return null;
  }

  const Component = getModals(type);
  return <Component onHide={hideModal} />;
};

const Channels = ({ channels, currentChannelId, changeChannel }) => {
  const [modalInfo, setModalInfo] = useState({ type: 'adding' });
  // const [showModal, setShowModal] = useState(false);
  const hideModal = () => setModalInfo({ type: null, item: null });

  const addChannelHandler = () => {
    setModalInfo({ type: 'adding' });
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button onClick={addChannelHandler} type="button" className="ml-auto p-0 btn btn-link">
          +
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((item) => channel(item, currentChannelId, changeChannel))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
