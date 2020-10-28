import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  Nav, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices';
import getModals from '../modals';

const channel = (
  { id, name, removable },
  currentChannelId,
  removelHandler,
  renamelHandler,
) => {
  const dispatch = useDispatch();

  const btnClass = cn('nav-link text-left', {
    'btn-block mb-2': !removable,
    'flex-grow-1': removable,
  });

  const btnColor = currentChannelId === id ? 'primary' : 'light';

  const changeChannelHandler = () => {
    dispatch(actions.changeChannel({ id }));
  };

  if (removable) {
    return (
      <Nav.Item as="li" key={id}>
        <Dropdown className="d-flex mb-2" as={ButtonGroup}>
          <Button onClick={changeChannelHandler} variant={btnColor} className={btnClass}>
            {name}
          </Button>
          <Dropdown.Toggle
            className="flex-grow-0"
            split
            variant={btnColor}
            id="dropdown-split-basic"
          />
          <Dropdown.Menu>
            <Dropdown.Item active={false} onClick={removelHandler(id)} href="#">
              Remove
            </Dropdown.Item>
            <Dropdown.Item active={false} onClick={renamelHandler(id, name)} href="#">
              Rename
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" key={id}>
      <Button onClick={changeChannelHandler} className={btnClass} variant={btnColor}>
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

const Channels = () => {
  const { channels } = useSelector((state) => state.channels);
  const { currentChannelId } = useSelector((state) => state.channels);

  const [modalInfo, setModalInfo] = useState({ type: null });

  const hideModal = () => setModalInfo({ type: null, item: null });

  const addChannelHandler = () => {
    setModalInfo({ type: 'adding', item: { channels } });
  };

  const removelHandler = (id) => () => {
    setModalInfo({ type: 'removing', item: { id } });
  };

  const renamelHandler = (id, name) => () => {
    setModalInfo({ type: 'renaming', item: { id, name, channels } });
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
        {channels
          .map((item) => channel(item,
            currentChannelId,
            removelHandler,
            renamelHandler))}
      </Nav>
      {renderModal(modalInfo, hideModal)}
    </div>
  );
};

export default Channels;
