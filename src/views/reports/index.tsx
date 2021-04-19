import React from "react";
import { RouteComponentProps } from "react-router";

interface ReportsProps extends RouteComponentProps {

};

const Reports: React.FunctionComponent<ReportsProps> = (props) => {
    return (
        <div>
            Reports
        </div>
    );
};

export default Reports;