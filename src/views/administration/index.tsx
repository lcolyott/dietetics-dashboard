import React from "react";
import { RouteComponentProps } from "react-router";

interface AdministrationProps extends RouteComponentProps {

};

const Administration: React.FunctionComponent<AdministrationProps> = (props) => {
    return (
        <div>
            Administration
        </div>
    );
};

export default Administration;