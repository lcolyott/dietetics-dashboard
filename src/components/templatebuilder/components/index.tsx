import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { componentStyles } from "./styles";
import { BaseComponentProps } from "./types";

const BaseComponent: React.FunctionComponent<BaseComponentProps> = (props) => {
    const { children, classes, className, draggable, droppabled, fullWidth, id, style, disabled, ...rest } = props;

    const drag = draggable && !disabled ? useDrag(() => ({
        type: "",
        item: {}
    })) : undefined;

    const drop = droppabled && !disabled ? useDrop(() => ({
        accept: ""
    })) : undefined;

    return (
        <div
            id={id}
            ref={drag?.[1]}
            className={
                clsx(
                    classes?.root,
                    fullWidth && classes?.fullWidth,
                    className
                )}
            style={style}
        >
            <div
                ref={drop?.[1]}
                className={classes?.content}
            >
                {children}
                <div className={classes?.actions}>
                    Actions
                </div>
            </div>
        </div>
    );
};

const Component = withStyles(
    componentStyles,
    { name: "FormBuilder-Component" }
)(BaseComponent);

export default Component;