import { StandardProps } from "@material-ui/core";
import React from "react";

/** Defines the classes used with Material-UI's styles API */
export type ComponentClassKey = "root" | "content" | "actions" | "fullWidth" | "draggable" | "droppabled";

export interface BaseComponentProps
    extends StandardProps<
    {},
    ComponentClassKey
    > {
    /** 
     * Contents of the component
     */
    children?: React.ReactNode;

    /** If 'true', disable this component. */
    disabled?: boolean;

    /** 
     * If 'true', this component will be draggable.
     */
    draggable?: boolean;

    /**
     * If 'true', this component will be droppable.
     */
    droppabled?: boolean;

    /** 
     * If 'true', component will take up the full width of its container
     */
    fullWidth?: boolean;

    /**
     * The id of the root element.
     */
    id?: string;
};