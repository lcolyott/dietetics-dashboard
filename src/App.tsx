import React from 'react';
import { Switch, Route } from "react-router-dom";
import AuthRoute from "./components/navigation/authroute";
import { Dashboard, Login, Account, Placements } from "./views";
import { AuthRoutes, NonAuthRoutes, userRoles } from "./data/enums";
import { Container, useTheme } from '@material-ui/core';

function App() {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Container>
        <Switch>
          <Route exact path={NonAuthRoutes.login} component={Login} />
          <AuthRoute path={AuthRoutes.account} requiredRoles={[...userRoles.all]} Component={Account} />
          <AuthRoute path={AuthRoutes.dashboard} requiredRoles={[...userRoles.all]} Component={Dashboard} />
          <AuthRoute path={AuthRoutes.placements} requiredRoles={[...userRoles.users]} Component={Placements} />
          <Route path={NonAuthRoutes.unauthorized} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
