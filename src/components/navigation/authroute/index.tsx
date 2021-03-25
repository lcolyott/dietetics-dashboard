import React, { useEffect } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { NonAuthRoutes, userRoles } from "../../../data/enums";

interface AuthRouteProps {
    Component: React.FunctionComponent<RouteComponentProps>;
    path: string;
    requiredRoles: string[]
    exact?: boolean;
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
    const { Component, path, requiredRoles, exact = false } = props;
    // const isAuthed: boolean = !!localStorage.getItem("ACCESS_TOKEN");
    // const {userRole} = React.useContext(UserContext);
    const isAuthed: boolean = true;
    const userRole = "student";
    const userHasRequiredRole = requiredRoles.includes(userRole);
    const message = userHasRequiredRole ? "Please log in to view this page" : "Unauthorized";

    useEffect(() => {
        console.log(userRole, requiredRoles, userHasRequiredRole);
    }, []);

    return (
        <div>
            <Route
                path={path}
                exact={exact}
                render={(props: RouteComponentProps) =>
                    isAuthed ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: userHasRequiredRole ? NonAuthRoutes.login : NonAuthRoutes.unauthorized,
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