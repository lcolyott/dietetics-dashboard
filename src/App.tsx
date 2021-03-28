import React from 'react';
import { Switch, Route } from "react-router-dom";
import AuthRoute from "./components/navigation/authroute";
import { userRoles, routes } from "./data/authorization";
import { Container, useTheme } from '@material-ui/core';
import AppLayout from './components/layout';

function App() {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Switch>
        <Route path={routes.unauthorizedRoutes["unauthorized"].path} component={routes.unauthorizedRoutes["unauthorized"].component} />
        <Route exact path={routes.unauthorizedRoutes["login"].path} component={routes.unauthorizedRoutes["login"].component} />
        <AppLayout>
          {Object.entries(routes.authorizedRoutes).map((entry, index) => (
            <AuthRoute key={index} path={entry[1].path} Component={entry[1].component} requiredRoles={entry[1].authorizedRoles ?? userRoles.admins} />
          ))}
        </AppLayout>
      </Switch>
    </div>
  );
};

export default App;
