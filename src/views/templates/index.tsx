import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useContext } from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import AuthContext from "../../components/context/auth";

const useStyles = makeStyles((theme: Theme) => createStyles({

}), { name: "NDDTemplates" });

interface TemplatesProps extends RouteComponentProps { };

const Templates: React.FunctionComponent<TemplatesProps> = (props) => {
    const classes = useStyles();
    const match = useRouteMatch();
    const auth = useContext(AuthContext);

    return (
        <>Templates</>
    );
};

export default Templates;