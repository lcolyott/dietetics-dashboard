import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { AuthorizedRoute } from "../../../data/authorization";
import { } from "../../../data/models";

interface NavContextState {
    navHeader?: string;
    navigate: (to: AuthorizedRoute) => void;
};

const NavContext = React.createContext<NavContextState | undefined>(undefined);

const NavContextProvider: React.FunctionComponent<any> = (props) => {
    const [state, setState] = React.useState<NavContextState | undefined>(undefined);
    const history = useHistory();

    useEffect(() => {
        let context: NavContextState = {
            navigate
        };

        setState(context);
    }, []);

    const navigate = (to: AuthorizedRoute) => {
        let newState = {
            navHeader: to.label,
            navigate
        };

        setState(newState);

        history.push(to.path);
    };

    return (
        <NavContext.Provider value={state}>
            {props.children}
        </NavContext.Provider>
    );
};

export default NavContext;
export type { NavContextState };
export { NavContextProvider };