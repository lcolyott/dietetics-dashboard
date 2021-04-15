import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { } from "../../../data/models";

interface NavContextState {
    navigate: (to: string) => void;
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

    useEffect(() => {
        return function cleanup() {

        };
    }, [state]);

    const navigate = (to: string) => {
        history.push(to);
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