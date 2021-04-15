import { Container, createStyles, makeStyles, Paper, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import ContactCard from "../../components/contact";
import AuthContext from "../../components/context/auth";
import NavContext from "../../components/context/nav";

const useStyles = makeStyles((theme: Theme) => createStyles({

}), { name: "NDDview-placement" });

interface PlacementProps extends RouteComponentProps { };

const Placement: React.FunctionComponent<PlacementProps> = (props) => {
    const match = useRouteMatch();
    const auth = React.useContext(AuthContext);
    const nav = React.useContext(NavContext);

    return (
        <Paper variant={"outlined"}>
            <Toolbar>
                <Typography variant={"h6"} color={"primary"}>
                    Placement
                </Typography>
            </Toolbar>
            <Container>
                <ContactCard />
            </Container>
            <Toolbar/>
        </Paper>
    );
};

export default Placement;