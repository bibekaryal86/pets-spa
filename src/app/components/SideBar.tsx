import React from 'react';

import { DisplayCardBody, DisplayCardRow, DisplayCardWrapper } from '../../styles/styled.card.style';

const SideBar = (): React.ReactElement => {
  return (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <DisplayCardRow borderBtm>Side Bar Component</DisplayCardRow>
        <DisplayCardRow>Find something to display in Sidebar</DisplayCardRow>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );
};

export default SideBar;
