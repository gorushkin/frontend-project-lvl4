import React from 'react';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

const App = (props) => {
  const { gon } = props;
  return (
    <div className="row h-100 pb-3">
      <LeftColumn channels={gon.channels} />
      <RightColumn />
    </div>
  );
};

export default App;
