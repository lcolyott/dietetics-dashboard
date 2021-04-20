import React, { useEffect } from "react";
import { ConnectedProps } from "react-redux";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { getDefaultRoute, routes, userRoles } from "../../../data/authorization";
import { userStateConnector } from "../../../redux/reducers/user";
import AuthContext from "../../context/auth";

interface AuthRouteProps extends ConnectedProps<typeof userStateConnector> {
    Component: React.FunctionComponent<RouteComponentProps>;
    path: string;
    requiredRoles: string[]
    exact?: boolean;
    index?: boolean;
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
    const { Component, path, requiredRoles, exact, index, user } = props;

    let isAuthenticated: boolean = user ? true : false;
    let isAuthorized = requiredRoles.includes(props.user?.Role?.toLowerCase() ?? "") || requiredRoles.includes("anonymous");
    const message = isAuthorized ? "Please log in to view this page" : "Unauthorized";

    useEffect(() => {
        console.log(props);
    }, [])

    const RedirectTo = (props: RouteComponentProps) => {
        if (index) {
            if (isAuthenticated && user?.Role) {
                return <Redirect
                    to={{
                        pathname: getDefaultRoute(user?.Role).path,
                        state: {
                            message,
                            requestedPath: path
                        }
                    }}
                />
            }
            else {
                return <Component {...props} />
            }
        }
        else {
            if (isAuthenticated && isAuthorized) {
                return <Component {...props} />
            }
            else if (isAuthenticated && !isAuthorized) {
                return <Redirect
                    to={{
                        pathname: routes.unauthorizedRoutes["unauthorized"].path,
                        state: {
                            message,
                            requestedPath: path
                        }
                    }}
                />
            }
            else {
                return <Redirect
                    to={{
                        pathname: routes.unauthorizedRoutes["login"].path,
                        state: {
                            message,
                            requestedPath: path
                        }
                    }}
                />
            }
        }
    };

    return (
        <div>
            <Route
                path={path}
                exact={exact}
                render={(props: RouteComponentProps) => <RedirectTo {...props} />}
            />
        </div>
    );
};

export default userStateConnector(AuthRoute)