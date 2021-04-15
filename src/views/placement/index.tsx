import { Container, createStyles, makeStyles, Paper, Theme, Toolbar, Typography, Divider, Grid } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import ContactCard from "../../components/contact";
import AuthContext from "../../components/context/auth";
import NavContext from "../../components/context/nav";
import PlacementForms from "../../components/placement/forms";
import SiteCard from "../../components/site";
import TimeLogger from "../../components/timelogger";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    },
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
            <Divider variant={"middle"} style={{ marginBottom: "1rem" }} />
            <Container>
                <Grid container spacing={2}>
                    <Grid container item xs={12}>
                        <PlacementForms />
                    </Grid>
                    <Grid container item xs={12}>
                        <TimeLogger />
                    </Grid>
                    <Grid container item xs={12} direction={"column"}>
                        <Typography gutterBottom variant={"h6"} color={"textSecondary"}>
                            Contacts
                        </Typography>
                        <Grid container item xs={12} style={{ columnGap: "1rem" }}>
                            <ContactCard />
                            <ContactCard />
                            <ContactCard />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Toolbar />
        </Paper>
    );
};

export default Placement;