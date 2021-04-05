import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import { Unauthorized } from "..";
import AuthRoute from "../../components/navigation/authroute";
import { userRoles } from "../../data/authorization";

interface SemestersProps {

};

interface SemestersState {

};

class Semesters extends React.PureComponent<SemestersProps, SemestersState> {
    constructor(props: SemestersProps) {
        super(props);
        this.state = {

        };
    };

    //#region Component Lifecycle Callbacks
    componentDidMount() { };
    componentDidUpdate() { };
    componentWillUnmount() { };
    //#endregion

    render() {
        return (
            <Switch>
                <AuthRoute path={"/"} Component={Unauthorized} requiredRoles={userRoles.admins} />
                <AuthRoute path={"/create"} Component={Unauthorized} requiredRoles={userRoles.admins} />
            </Switch>
        );
    };
};

export default Semesters;