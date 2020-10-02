import React from 'react';
import { connect } from 'react-redux';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const App = (props) => {
  const { gon, messages } = props;
  return (
    <div className="row h-100 pb-3">
      <LeftColumn channels={gon.channels} />
      <RightColumn />
    </div>
  );
};

export default connect(mapStateToProps)(App);

