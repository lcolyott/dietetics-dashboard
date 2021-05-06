import { Dashboard, IndeterminateCheckBox, ViewColumn, ViewStream } from "@material-ui/icons";
import React from "react";
import { TemplateItem, TemplateItemType, WidgetTemplateItem, LayoutTemplateItem, FormatTemplateItem } from ".";
import { WithOptional } from "../../../../utilities/types";
import { ToolboxItem } from "../../toolbox";
import { Format, Layout, Root, Widget } from "./components";

const TemplateItemComponentMap: Record<TemplateItemType, Record<string, any>> = {
    "ROOT": {
        "ROOT": Root
    },
    "LAYOUT": {
        "LAYOUT": Layout
    },
    "FORMAT": {
        "H1": Format
    },
    "WIDGET": {
        "TEST": Widget
    }
};

const TemplateLayoutComponents: Record<string, WithOptional<LayoutTemplateItem, "id">> = {
    "COLUMN": {
        id: "NEW",
        component: "LAYOUT",
        type: "LAYOUT",
        direction: "column"
    },
    "ROW": {
        id: "NEW",
        component: "LAYOUT",
        type: "LAYOUT",
        direction: "row"
    }
};

const TemplateFormatComponents: Record<string, WithOptional<FormatTemplateItem, "id">> = {
    "HEADER": {
        id: "NEW",
        component: "HEADER",
        type: "FORMAT",
    },
};

const TemplateWidgetComponents: Record<string, WithOptional<WidgetTemplateItem, "id">> = {
    "TEST": {
        id: "NEW",
        component: "TEST",
        type: "WIDGET",
    }
};

const TemplateComponents: Record<string, Record<string, WithOptional<TemplateItem, "id">>> = {
    "LAYOUT": { ...TemplateLayoutComponents },
    "FORMAT": { ...TemplateFormatComponents },
    "WIDGETS": { ...TemplateWidgetComponents },
};

const ToolboxItems: Record<string, Record<string, ToolboxItem>> = {
    "LAYOUT": {
        "ROW": {
            item: {
                id: "NEW",
                component: "LAYOUT",
                type: "LAYOUT",
                direction: "row"
            } as LayoutTemplateItem,
            label: "Row",
            Icon: ViewStream
        },
        "COLUMN": {
            item: {
                id: "NEW",
                component: "LAYOUT",
                type: "LAYOUT",
                direction: "column"
            } as LayoutTemplateItem,
            label: "Row",
            Icon: ViewColumn
        }
    },
    "FORMAT": {
        "H1": {
            item: {
                id: "NEW",
                component: "H1",
                type: "FORMAT",
                variant: "h6"
            } as FormatTemplateItem,
            label: "Header 1",
        }
    },
    "WIDGETS": {
        "TEST": {
            item: {
                id: "NEW",
                component: "TEST",
                type: "WIDGET",
            } as WidgetTemplateItem,
            label: "Widget",
            Icon: IndeterminateCheckBox
        }

    }
};

export { TemplateItemComponentMap, TemplateWidgetComponents, TemplateLayoutComponents, TemplateComponents, ToolboxItems };