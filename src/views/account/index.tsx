import React from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import AuthContext from "../../components/context/auth";
import NavContext from "../../components/context/nav";
import MyAccount from "../../components/myaccount";

interface AccountProps extends RouteComponentProps { };

const Account: React.FunctionComponent<AccountProps> = (props) => {
    const match = useRouteMatch();
    const auth = React.useContext(AuthContext);
    const nav = React.useContext(NavContext);

    return (
        <div>
            {auth?.user && <MyAccount user={auth?.user} />}
        </div>
    );
};

export default Account;