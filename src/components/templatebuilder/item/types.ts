export type ItemType = "ROOT" | "LAYOUT" | "FORMAT" | "WIDGET";

export interface FormItem {
    children?: FormItem[];
    component?: string;
    id?: string;
    itemType?: ItemType;
};