import React from "react";
import { TemplateItemType } from ".";
import { Layout, Root, TestWidget } from "./components";

const TemplateItemComponentMap: Record<TemplateItemType, Record<string, any>> = {
    "ROOT": {
        "ROOT": Root
    },
    "LAYOUT": {
        "LAYOUT": Layout
    },
    "FORMAT": {},
    "WIDGET": {
        "TEST": TestWidget
    }
};

export { TemplateItemComponentMap };