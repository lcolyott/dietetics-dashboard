import React, { useEffect } from "react";
import { defaultRoutes } from "../../../data/authorization";
import { ApplicationUser, StudentUser, PreceptorUser, User } from "../../../data/models";
import { testUsers } from "../../../data/test";
import NavContext from "../nav";

interface AuthContextState {
    user?: User;
    signIn: (args?: unknown) => Promise<void>;
    signOut: (args?: unknown) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextState | undefined>(undefined);

const AuthContextProvider: React.FunctionComponent<any> = (props) => {
    const [user, setUser] = React.useState<User | undefined>(undefined);
    const nav = React.useContext(NavContext);

    // Called when component mounted to DOM
    useEffect(() => {
        // TODO: Check if auth token exists in cache and grab user if undefined
    }, []);

    // Only called when the user object changes in state
    useEffect(() => {

        // If there is a user, we want to navigate to this user's default route
        if (user) {
            nav?.navigate(defaultRoutes[user.Role.toLowerCase() as "student" | "preceptor" | "admin"].path)
        };

        return function cleanup() {

        };
    }, [user]);

    // TODO:
    const signIn = (args?: unknown): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (process.env.NODE_ENV === "development") {
                    setUser(testUsers[2]);
                }
            }, 1000);

            resolve();
        });
    };

    // TODO:
    const signOut = (args?: unknown): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setUser(undefined);

                resolve();
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export type { AuthContextState };
export { AuthContextProvider };
