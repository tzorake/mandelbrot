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
    color: string,
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
    hint?: string,
    segments: Array<Segment>,
};

// SideBar > Tab[] > Segment[] > Group[] > Element[] > Control[]
export type SideBar = {
    id: number,
    expanded: boolean,
    currentTab: number,
    tabs: Array<Tab>,
};

export type PaletteColor = string;
export type PaletteEntry = { value: number, color: PaletteColor };

export type CanvasView = {
    step: number,
    maximumIteration: number,
    radius: number,

    translationX: number,
    translationY: number,
    zoom: number,
    radians: number,

    palette: Array<PaletteEntry>,
};

export type ViewModel = {
    sideBar: SideBar,
    canvasView: CanvasView,
};
