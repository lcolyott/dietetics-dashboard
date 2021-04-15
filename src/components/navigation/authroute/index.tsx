import React, { useEffect } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { routes, userRoles } from "../../../data/authorization";
import AuthContext from "../../context/auth";

interface AuthRouteProps {
    Component: React.FunctionComponent<RouteComponentProps>;
    path: string;
    requiredRoles: string[]
    exact?: boolean;
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
    const { Component, path, requiredRoles, exact = false } = props;
    // const isAuthenticated: boolean = !!localStorage.getItem("ACCESS_TOKEN");

    const auth = React.useContext(AuthContext);

    const isAuthenticated: boolean = auth?.user ? true : false;
    const isAuthorized = requiredRoles.includes(auth?.user?.Role.toLowerCase() ?? "");
    const message = isAuthorized ? "Please log in to view this page" : "Unauthorized";



    useEffect(() => {

    }, []);

    return (
        <div>
            <Route
                path={path}
                exact={exact}
                render={(props: RouteComponentProps) =>
                    isAuthenticated && isAuthorized ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: !isAuthenticated ? routes.unauthorizedRoutes["login"].path : routes.unauthorizedRoutes["unauthorized"].path,
                                state: {
                                    message,
                                    requestedPath: path
                                }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default AuthRoute;