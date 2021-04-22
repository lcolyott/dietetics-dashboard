import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { ConnectedProps } from "react-redux";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { getDefaultRoute, routes, userRoles } from "../../../data/authorization";
import { User } from "../../../data/models";
import { userStateConnector } from "../../../redux/reducers/user";
import AuthContext from "../../context/auth";

interface AuthRouteProps {
    Component: React.FunctionComponent<RouteComponentProps>;
    path: string;
    requiredRoles: string[]
    exact?: boolean;
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
    const { Component, path, requiredRoles, exact } = props;

    // let isAuthenticated: boolean = user ? true : false;
    // let isAuthorized = requiredRoles.includes(props.user?.Role?.toLowerCase() ?? "") || requiredRoles.includes("anonymous");

    useEffect(() => {

    }, []);

    //#region Utilities
    const isAuthenticated = (user: User | undefined): boolean => {
        return user ? true : false;
    };

    const isAuthorized = (user: User | undefined) => {
        return requiredRoles.includes(user?.Role.toLowerCase() ?? "") || requiredRoles.includes("anonymous");
    };

    const getRedirect = (user: User | undefined): string => {
        // If we are an authentic user, but are not authorized to view this page
        if (isAuthenticated(user) && !isAuthorized(user)) {
            return routes.unauthorizedRoutes["unauthorized"].path;
        }

        // Else, we aren't logged in
        return routes.unauthorizedRoutes["login"].path;
    };
    //#endregion

    return (
        <AuthContext.Consumer>
            {(context) =>
                context.status === "Idle" &&
                <Route
                    path={path}
                    exact={exact}
                    component={(props: RouteComponentProps) => isAuthenticated(context.user) && isAuthorized(context.user) ?
                        <Component {...props} />
                        :
                        <Redirect
                            to={{
                                pathname: getRedirect(context.user)
                            }}
                        />
                    }
                />
            }
        </AuthContext.Consumer>
    );
};

export default AuthRoute