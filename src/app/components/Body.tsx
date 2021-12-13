import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { protectedRoutes, publicRoutes } from '../config/routes';
import NotFound from './NotFound';
import SideBar from './SideBar';

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

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  loginPage: string;
} & RouteProps;

function ProtectedRoute({
  isLoggedIn,
  loginPage,
  ...routeProps
}: ProtectedRouteProps): React.ReactElement {
  if (isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    const { path } = routeProps;
    return <Redirect to={{ pathname: loginPage, state: { redirect: path } }} />;
  }
}

const Body = ({ isLoggedIn }: { isLoggedIn: boolean }): React.ReactElement => {
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isLoggedIn,
    loginPage: '/',
  };

  const sidebar = () => <SideBar />;

  const body = () => (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}
      {protectedRoutes.map((route) => (
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <BodyWrapper>
      {isLoggedIn && <SidebarContent>{sidebar()}</SidebarContent>}
      <BodyContent>{body()}</BodyContent>
    </BodyWrapper>
  );
};

export default Body;
