import { Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";

interface UserPlacementsProps {
    semesterId: number;
};

const UserPlacements: React.FunctionComponent<UserPlacementsProps> = (props) => {
    return (
        <Paper>
            <Toolbar>
                <Typography variant={"h6"} color={"primary"}>
                    My Placements
                </Typography>
            </Toolbar>
        </Paper>
    );
};

export default UserPlacements;