import { createStyles, Divider, makeStyles, Paper, Theme, Toolbar, Typography, TypographyVariant } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FormatTemplateItem, LayoutTemplateItem, RootTemplateItem, TemplateItem, WidgetTemplateItem } from ".";
import { WithOptional } from "../../../utilities/types";

const useStyles = makeStyles((theme: Theme) => createStyles({
    component: {
        border: "1px dashed " + theme.palette.divider,
    },
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

        alignContent: "flex-start",

        padding: ".5rem",

        height: "100%",

        overflow: "scroll",
    },
    layout: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "calc(50% - .5rem)",
        gap: "1rem",

        padding: ".5rem",

        minHeight: "200px",

        "&.row": {
            flexDirection: "row",
            alignContent: "flex-start",
            backgroundColor: "rgba(255, 60, 0, .1)",

            "& > $widget": {
                flex: "1 1 calc(50% - .5rem)"
            }
        },
        "&.column": {
            flexDirection: "column",
            backgroundColor: "rgba(255, 200, 0, .1)",

            "& > $format": {
                flexGrow: 0,
            },
            "& > $widget": {

            }
        }
    },
    format: {
        flexGrow: 1,
        flexBasis: "100%",
        height: "100px",
    },
    widget: {
        height: "100px",
        backgroundColor: "white",

        "&:hover": {
            backgroundColor: "rgba(175, 255, 255, .5)",
        }
    }
}));

interface BaseTemplateComponentProps {
    item: TemplateItem;
    onDrop: (droppedItem: WithOptional<TemplateItem, "id">, newParent: TemplateItem) => void;
};

interface RootProps extends Omit<BaseTemplateComponentProps, "item"> {
    item: RootTemplateItem;
};

interface LayoutProps extends Omit<BaseTemplateComponentProps, "item"> {
    item: LayoutTemplateItem;
};

interface FormatProps extends Omit<BaseTemplateComponentProps, "item"> {
    item: FormatTemplateItem;
};

interface WidgetProps extends Omit<BaseTemplateComponentProps, "item"> {
    item: WidgetTemplateItem;
};

// TODO: Make base component HOC that has delete, move, and edit operations
// TODO: Make base "drop component" HOC that takes acceptable item types

const Root: React.FunctionComponent<RootProps> = (props: any) => {
    const classes = useStyles();
    const { item, onDrop, ...rest } = props;

    const [{ isOver, isOverCurrent }, dropRef] = useDrop(() => ({
        accept: ["LAYOUT", "FORMAT"],
        drop: (dropped: WithOptional<TemplateItem, "id">, monitor) => {
            // console.log(dropped);
            if (monitor.didDrop()) {
                return;
            }

            onDrop(dropped, item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            isOverCurrent: !!monitor.isOver({ shallow: true }),
        })
    }));

    return (
        <div ref={dropRef} className={classes.root}>
            {props.children}
        </div>
    );
};

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    const classes = useStyles();
    const { item, onDrop, ...rest } = props;

    const [{ isOver, isOverCurrent }, dropRef] = useDrop(() => ({
        accept: ["WIDGET"],
        drop: (dropped: WithOptional<TemplateItem, "id">, monitor) => {
            // console.log(dropped);
            if (monitor.didDrop()) {
                return;
            }

            onDrop(dropped, item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            isOverCurrent: !!monitor.isOver({ shallow: true }),
        })
    }));

    return (
        <div ref={dropRef} className={clsx(classes.layout, item.direction === "column" ? "column" : "row", classes.component)}>
            {props.children}
        </div>
    );
};

const Format: React.FunctionComponent<FormatProps> = (props) => {
    const classes = useStyles();
    const { item, ...rest } = props;

    const [collected, dragRef] = useDrag(() => ({
        type: "FORMAT",
        item,
    }));

    return (
        <div ref={dragRef} className={clsx(classes.component, classes.format)}>
            <Typography variant={item.variant}>
                HEADER
            </Typography>
            {props.children}
        </div>
    );
};

const Widget: React.FunctionComponent<WidgetProps> = (props) => {
    const classes = useStyles();
    const { item, ...rest } = props;

    const [collected, dragRef] = useDrag(() => ({
        type: "WIDGET",
        item,
    }));

    return (
        <div ref={dragRef} className={clsx(classes.component, classes.widget)}>
            WIDGET {item.id}
            {props.children}
        </div>
    );
};

export { Root, Layout, Format, Widget }