import React, { useContext, useEffect } from "react";
import { ConnectedProps } from "react-redux";
import { routes } from "../../../data/authorization";
import { UserSignInArgs } from "../../../data/events";
import { ApplicationUser, StudentUser, PreceptorUser, User } from "../../../data/models";
import { testUsers } from "../../../data/test";
import user, { userConnector } from "../../../redux/reducers/user";
import NavContext from "../nav";

interface AuthContextState extends ConnectedProps<typeof userConnector> { };

const AuthContext = React.createContext<Partial<AuthContextState>>({
    status: "Idle"
});

const ACP: React.FunctionComponent<AuthContextState> = (props) => {
    return (
        <AuthContext.Provider value={{
            ...props
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

const AuthContextProvider = userConnector(ACP);

export default AuthContext;
export type { AuthContextState };
export { AuthContextProvider };
