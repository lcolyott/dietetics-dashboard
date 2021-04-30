import { CSSProperties } from "react";

// TODO: Create map between widget types and strings
type TemplateItemType = "ROOT" | "LAYOUT" | "FORMAT" | "WIDGET";

interface BaseTemplateItem {
    id: string;
    component: string;
    children?: TemplateItem[];
};

interface RootTemplateItem extends Omit<BaseTemplateItem, "component"> {
    component: "ROOT";
    type: (TemplateItemType & "ROOT");
};

interface LayoutTemplateItem extends Omit<BaseTemplateItem, "component"> {
    component: "LAYOUT";
    type: (TemplateItemType & "LAYOUT");
    direction: "row" | "column",
};

interface FormatTemplateItem extends BaseTemplateItem {
    type: (TemplateItemType & "FORMAT");
};

interface WidgetTemplateItem extends BaseTemplateItem {
    type: (TemplateItemType & "WIDGET");
};

type TemplateItem =
    RootTemplateItem
    | LayoutTemplateItem
    | FormatTemplateItem
    | WidgetTemplateItem;

export type { TemplateItem, TemplateItemType, RootTemplateItem, LayoutTemplateItem, FormatTemplateItem, WidgetTemplateItem };
export { };
