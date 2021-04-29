import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { LayoutTemplateItem, TemplateItem } from ".";
import { TemplateItemComponentMap } from "./data";

export function Root(props: any) {
    return (
        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "white" }}>
            {props.children}
        </div>
    );
};

export function Layout(props: React.PropsWithChildren<LayoutTemplateItem>) {
    return (
        <div style={{ display: "flex", flexDirection: props.direction, flexGrow: 1, padding: "1rem", backgroundColor: (props.direction === "column" ? "rgba(255, 200, 0, .2)" : "rgba(255, 60, 0, .2)") }}>
            {props.direction === "column" ? "Column" : "Row"}
            {props.children}
        </div>
    );
};

export function TestWidget(props: any) {
    return (
        <div>
            TEST WIDGET
            {props.children}
        </div>
    );
};


/** Return the component defined by the TemplateItem */
export function mapItemToComponent(templateItem: TemplateItem) {
    if (templateItem.type && templateItem.component) {
        return TemplateItemComponentMap[templateItem.type][templateItem.component];

    }

    return React.Fragment;
};