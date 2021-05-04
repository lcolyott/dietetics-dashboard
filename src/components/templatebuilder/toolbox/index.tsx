import { createStyles, Divider, List, makeStyles, Paper, Theme, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
import React from "react";
import { useDrag } from "react-dnd";
import { WithOptional } from "../../../utilities/types";
import { TemplateItem } from "../widgets";
import { ToolboxItems } from "../widgets/data";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexBasis: "17.5rem",
        height: "100%",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",

        paddingTop: "0.5rem",
        padding: "1rem",
    },
    itemGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: ".5rem",
    },
    toolboxItem: {
        position: "relative",

        display: "flex",
        flexBasis: "calc(33.333% - .5rem)",

        boxSizing: "border-box",

        alignItems: "center",
        justifyContent: "center",

        border: "1px solid " + theme.palette.divider,

        cursor: "pointer",

        "&:before": {
            content: "''",
            display: "block",
            paddingTop: "100%",
        },
    }
}), { name: "NDDTemplateBuilder-Toolbox" });

interface ToolboxProps { };

interface ToolboxItem {
    label: string;
    item: WithOptional<TemplateItem, "id">;
    Icon?: React.ComponentType<any>;
};

const ToolboxItem: React.FunctionComponent<ToolboxItem> = (props) => {
    const classes = useStyles();
    const { item, label, Icon, ...rest } = props;

    const [collected, dragRef] = useDrag(() => ({
        type: item.type,
        item,
    }));

    return (
        <Tooltip title={label}>
            <div ref={dragRef} className={classes.toolboxItem} {...rest}>
                {Icon ?
                    <Icon /> :
                    <Typography variant={"h5"}>
                        {label}
                    </Typography>
                }
            </div>
        </Tooltip>
    );
};

const Toolbox: React.FunctionComponent<ToolboxProps> = (props) => {
    const classes = useStyles();

    const renderItems = () => {
        return Object.entries(ToolboxItems).map((entry, index) => (
            <React.Fragment key={index}>
                <Typography variant={"subtitle1"} color={"textSecondary"} style={{ marginTop: ".5rem" }}>
                    {entry[0]}
                </Typography>
                <div className={classes.itemGrid}>
                    {Object.entries(entry[1]).map((component, index) => (
                        <ToolboxItem key={index} label={component[0]} item={component[1].item} Icon={component[1].Icon} />
                    ))}
                </div>
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
            <div className={classes.content}>
                {renderItems()}
            </div>
        </Paper>
    );
};

export { };
export type { ToolboxItem };
export default Toolbox;