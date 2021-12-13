import { useContext, useEffect, useState } from 'react';
import PetsLogo from '/public/images/petslogo.gif';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { UserDetails } from '../../home/types/home.data.types';
import { protectedRoutes } from '../config/routes';

const StyledHeader = styled.header.attrs({
  className: 'styled-header',
})`
  position: relative;
  z-index: 1;
  top: 0;
`;

const StyledNav = styled.nav.attrs({
  className: 'styled-nav',
})<StyledNavProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  color: whitesmoke;

  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  background: ${(props) =>
    props.background ? props.background : 'mediumseagreen'};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : 'center'};

  @media (max-width: 786px) {
    flex-direction: column;
  }
`;

const StyledNavLink = styled(NavLink)<StyledNavProps>`
  margin: ${(props) => (props.margin ? props.margin : '5px 5px 5px 5px')};
  padding: ${(props) => (props.padding ? props.padding : '5px 5px 5px 5px')};
  color: whitesmoke;
  font-weight: normal;
  &.active {
    font-weight: bold;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledNavLinkDropdown = styled(StyledNavLink)`
  margin: 0px;
  background: mediumseagreen;
  display: block;
  text-align: left;
  &:hover {
    background-color: darkseagreen;
  }
`;

const StyledNavDropdownMenuContent = styled.div.attrs({
  className: 'styled-nav-dropdown-menu-content',
})`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const StyledNavDropdownMenu = styled.div.attrs({
  className: 'styled-nav-dropdown-menu',
})`
  display: inline-block;
  &:hover ${StyledNavDropdownMenuContent} {
    display: block;
  }
`;

const StyledNavLinkButton = styled(StyledNavLink)<StyledNavProps>`
  padding: 2px 5px 2px 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid whitesmoke;
`;

// use all lowercase because of console error
// use string instead of boolean because of console error
interface StyledNavProps {
  margin?: string;
  padding?: string;
  justifycontent?: string;
  background?: string;
  fontWeight?: string;
}

const getDisplayName = (userDetails: UserDetails): string =>
  userDetails ? userDetails.firstName + ' ' + userDetails.lastName : '';

const Header = (): React.ReactElement => {
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.auth) {
      setIsLoggedIn(authContext.auth.isLoggedIn);
      setDisplayName(getDisplayName(authContext.auth.userDetails));
    }
  }, [authContext]);

  return (
    <StyledHeader>
      <HeaderLinks displayName={displayName} />
      <Navigation isLoggedIn={isLoggedIn} />
    </StyledHeader>
  );
};

const HeaderLinks = ({ displayName = '' }): React.ReactElement => {
  return (
    <StyledNav
      justifycontent={displayName ? 'space-between' : ''}
      background="seagreen"
      fontWeight="bold"
    >
      Personal Expenses Tracking System
      {displayName.trim() ? (
        <>
          <img src={PetsLogo} alt="pets-logo.gif" />
          <div>
            {displayName} |
            <StyledNavLink to="/import" margin="0px 5px 0px 5px">
              Import
            </StyledNavLink>
            <StyledNavLinkButton to="/signout" margin="0px 5px 0px 5px">
              Sign Out
            </StyledNavLinkButton>
          </div>
        </>
      ) : (
        <></>
      )}
    </StyledNav>
  );
};

const getRoutePath = (route: string) => route.split('/:')[0];

const Navigation = ({ isLoggedIn = false }): React.ReactElement => {
  return (
    <StyledNav justifycontent="center">
      {protectedRoutes.map((route) =>
        route.display ? (
          route.submenu ? (
            <StyledNavDropdownMenu key={route.path}>
              <StyledNavLink to={getRoutePath(route.path)}>
                {route.display}
              </StyledNavLink>
              {isLoggedIn && (
                <StyledNavDropdownMenuContent>
                  {route.submenu.map((subroute) => (
                    <StyledNavLinkDropdown
                      key={subroute.path}
                      to={subroute.path}
                    >
                      {subroute.display}
                    </StyledNavLinkDropdown>
                  ))}
                </StyledNavDropdownMenuContent>
              )}
            </StyledNavDropdownMenu>
          ) : (
            <StyledNavLink key={route.path} to={route.path}>
              {route.display}
            </StyledNavLink>
          )
        ) : null,
      )}
    </StyledNav>
  );
};

export default Header;
