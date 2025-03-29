import type { tz } from "../backend/color.ts";

export type NumberFieldControl = {
    id: number,
    type: "NumberField",
    value: number,
    min?: number,
    max?: number,
    text?: string,
    dataType?: "Real" | "Int"
};
export type ComboBoxControlOption = { first: number, second: string };
export type ComboBoxControl = {
    id: number,
    type: "ComboBox",
    value: number,
    options: Array<ComboBoxControlOption>,
};
export type CheckBoxControl = {
    id: number,
    type: "CheckBox",
    value: boolean,
    text?: string,
};
export type ButtonControl = {
    id: number,
    type: "Button",
    icon?: string,
    text?: string,
};

export type Control = NumberFieldControl | ComboBoxControl | CheckBoxControl | ButtonControl;

export type Element = { 
    id: number,
    icon?: string, 
    text: string, 
    controls: Array<Control>,
};

export type ColorPaletteElement = { 
    id: number,
    color: tz.Color,
    controls: Array<Control>,
};

export type Group = { 
    id: number,
    type?: "Normal",
    icon?: string, 
    text: string, 
    expanded: boolean, 
    elements: Array<Element>,
};

export type ColorPaletteGroup = { 
    id: number,
    type: "ColorPalette",
    icon?: string, 
    text: string, 
    expanded: boolean, 
    elements: Array<ColorPaletteElement>,
};

export type Segment = { 
    id: number,
    icon?: string, 
    text: string, 
    groups: Array<Group | ColorPaletteGroup>,
};

export type Tab = {
    id: number,
    icon: string,
    text: string,
    segments: Array<Segment>,
};

// SideBar > Tab[] > Segment[] > Group[] > Element[] > Control[]
export type SideBar = {
    id: number,
    expanded: boolean,
    currentTab: number,
    tabs: Array<Tab>,
};

export type PaletteEntry = { id: number, value: number, color: tz.Color };

let iota = 0;

export const Space = {
    PARAMETER_SPACE: iota++, // 'Parameter Space (c-plane)'
    DYNAMIC_SPACE:   iota++, // 'Dynamic Space (z-plane)' or 'Julia space'
} as const;

export type Space = typeof Space[keyof typeof Space];

export type CanvasView = {
    realPart: number,
    imagPart: number,
    escapeRadius: number,
    maximumIterations: number,
    step: number,
    detailLevel: number,
    maximumDetailLevel: number,
    palette: Array<PaletteEntry>,
    space: Space,
    translationX: number,
    translationY: number,
    zoom: number,
    radians: number,
};
