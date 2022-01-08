import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import AppRoutes from './AppRoutes';

const BodyWrapper = styled.div.attrs({
  className: 'body-wrapper',
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
`;

export const SidebarContent = styled.div.attrs({
  className: 'sidebar-content',
})`
  display: inline-block;
`;

export const BodyContent = styled.div.attrs({
  className: 'body-content',
})`
  width: 100%;
  display: inline-block;
`;

const Body = ({ isLoggedIn }: { isLoggedIn: boolean }): React.ReactElement => {
  const sidebar = () => <SideBar />;
  const body = () => <AppRoutes />;

  return (
    <BodyWrapper>
      {isLoggedIn && <SidebarContent>{sidebar()}</SidebarContent>}
      <BodyContent>{body()}</BodyContent>
    </BodyWrapper>
  );
};

export default Body;
