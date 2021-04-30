import { createStyles, Divider, List, makeStyles, Paper, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useDrag } from "react-dnd";
import { WithOptional } from "../../../utilities/types";
import { TemplateItem } from "../widgets";
import { TemplateComponents } from "../widgets/data";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexBasis: "20rem",
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",

        paddingTop: "0.5rem",
        padding: "1rem",
    },
    toolboxItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        height: "75px",

        border: "1px solid " + theme.palette.divider,

        cursor: "pointer",
    }
}), { name: "NDDTemplateBuilder-Toolbox" });

interface ToolboxProps { };

interface ToolboxItemProps {
    label: string;
    item: WithOptional<TemplateItem, "id">;
};

const ToolboxItem: React.FunctionComponent<ToolboxItemProps> = (props) => {
    const classes = useStyles();
    const { item, label, ...rest } = props;

    const [collected, dragRef] = useDrag(() => ({
        type: item.type,
        item,
    }));

    return (
        <div ref={dragRef} className={classes.toolboxItem} {...rest}>
            {label}
        </div>
    );
};

const Toolbox: React.FunctionComponent<ToolboxProps> = (props) => {
    const classes = useStyles();

    const renderItems = () => {
        return Object.entries(TemplateComponents).map((entry, index) => (
            <React.Fragment key={index}>
                <Typography variant={"subtitle1"} color={"textSecondary"} style={{ marginTop: ".5rem" }}>
                    {entry[0]}
                </Typography>
                {Object.entries(entry[1]).map((component, index) => (
                    <ToolboxItem key={index} label={component[0]} item={component[1]} />
                ))}
            </React.Fragment>
        ))
    };

    return (
        <Paper variant={"outlined"} className={classes.root}>
            <Toolbar>
                <Typography variant={"h4"} color={"primary"}>
                    Toolbox
                </Typography>
            </Toolbar>
            <Divider variant={"middle"} />
            <div className={classes.itemContainer}>
                {renderItems()}
            </div>
        </Paper>
    );
};

export { };
export default Toolbox;