import React from "react";
import { TemplateItem, TemplateItemType, WidgetTemplateItem, LayoutTemplateItem, FormatTemplateItem } from ".";
import { WithOptional } from "../../../utilities/types";
import { Format, Layout, Root, Widget } from "./components";

const TemplateItemComponentMap: Record<TemplateItemType, Record<string, any>> = {
    "ROOT": {
        "ROOT": Root
    },
    "LAYOUT": {
        "LAYOUT": Layout
    },
    "FORMAT": {
        "HEADER": Format
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

export { TemplateItemComponentMap, TemplateWidgetComponents, TemplateLayoutComponents, TemplateComponents };