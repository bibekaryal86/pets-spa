import React from 'react';
import { Link } from 'react-router-dom';

import { DisplayCardBody, DisplayCardRow, DisplayCardWrapper } from '../../styles/styled.card.style';

const Summary = (): React.ReactElement => {
  const homePageText = () => (
    <>
      <DisplayCardWrapper>
        <DisplayCardBody>
          <h5>Find something to display in Summary</h5>
        </DisplayCardBody>
      </DisplayCardWrapper>
      <DisplayCardWrapper>
        <DisplayCardBody>
          <DisplayCardRow borderBtm>
            <h6>
              To add a new transaction, <Link to="/transaction">click here</Link>
            </h6>
          </DisplayCardRow>
          <DisplayCardRow>
            <h6>
              To view different reports, <Link to="/reports">click here</Link>
            </h6>
          </DisplayCardRow>
        </DisplayCardBody>
      </DisplayCardWrapper>
    </>
  );

  return <>{homePageText()}</>;
};

export default Summary;
