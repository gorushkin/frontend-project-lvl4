import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  Nav, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';
import { changeChannel } from '../redusers/channels';
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

const channel = ({ id, name, removable }, currentChannelId, changeChannel, removelHandler) => {
  const btnClass = 'nav-link text-left  btn-block';

  const btnClassTemp = cn('nav-link text-left', {
    'btn-block mb-2': !removable,
    'flex-grow-1': removable,
  });

  const btnColor = currentChannelId === id ? 'primary' : 'light';

  const changeChannelHendler = (id) => () => {
    changeChannel({ id });
  };

  const onSelect = (eventKey) => {
    // console.log(eventKey);
  };

  if (removable) {
    return (
      <Nav.Item as="li" key={id}>
        <Dropdown onSelect={onSelect} className="d-flex mb-2" as={ButtonGroup}>
          <Button onClick={changeChannelHendler(id)} className={btnClass} variant={btnColor}>
            {name}
          </Button>
          <Dropdown.Toggle split variant={btnColor} id="dropdown-split-basic" />
          <Dropdown.Menu rootCloseEvent="mousedown">
            <Dropdown.Item onSelect={removelHandler(id)} href="#">
              Remove
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('onClick')} href="#">
              Rename
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" key={id}>
      <Button onClick={changeChannelHendler(id)} className={btnClassTemp} variant={btnColor}>
        {name}
      </Button>
    </Nav.Item>
  );
};

const renderModal = ({ type, item }, hideModal) => {
  if (!type) {
    return null;
  }

  const Component = getModals(type);
  return <Component onHide={hideModal} item={item} />;
};

const Channels = ({ channels, currentChannelId, changeChannel }) => {
  const [modalInfo, setModalInfo] = useState({ type: null });
  const hideModal = () => setModalInfo({ type: null, item: null });

  const addChannelHandler = () => {
    setModalInfo({ type: 'adding' });
  };

  const removelHandler = (id) => () => {
    setModalInfo({ type: 'removing', item: { id } });
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button onClick={addChannelHandler} type="button" className="ml-auto p-0 btn btn-link">
          +
        </button>
      </div>
      <Nav variant="pills" className="flex-column nav-fill">
        {channels.map((item) => channel(item, currentChannelId, changeChannel, removelHandler))}
      </Nav>
      {renderModal(modalInfo, hideModal)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
