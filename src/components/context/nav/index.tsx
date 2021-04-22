import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { AuthorizedRoute } from "../../../data/authorization";
import { } from "../../../data/models";

interface NavContextState {
    status: string & "Init" | "Idle" | "Navigating";
    navHeader: string;
    currentRoute: AuthorizedRoute;
    navigate: (to: AuthorizedRoute) => void;
};

const NavContext = React.createContext<Partial<NavContextState>>({
    status: "Init"
});

const NavContextProvider: React.FunctionComponent<any> = (props) => {
    const history = useHistory();
    const [state, setState] = React.useState<Partial<NavContextState>>({
        status: "Init",
        navHeader: undefined,
        currentRoute: undefined,
        navigate: (to: AuthorizedRoute): Promise<boolean> => {
            var newState: Partial<NavContextState> = {
                ...state,
                status: "Navigating",
                navHeader: to.label,
                currentRoute: to
            };

            setState(newState);

            return new Promise((resolve, reject) => {
                setTimeout(() => {

                    setState({
                        ...newState,
                        status: "Idle",
                    });

                    if (newState.currentRoute) {
                        history.push(newState.currentRoute.path);
                    }

                    resolve(true);
                }, 150);
            });
        }
    });

    // useEffect(() => {
    //     setState({
    //         ...state,
    //         status: "Idle"
    //     })
    // }, []);

    return (
        <NavContext.Provider value={state}>
            {props.children}
        </NavContext.Provider>
    );
};

export default NavContext;
export type { NavContextState };
export { NavContextProvider };