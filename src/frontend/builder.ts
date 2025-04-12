import type { Ref } from "vue";
import { tz } from "../backend/color.ts";
import type { ButtonControl, CheckBoxControl, ColorPaletteElement, ColorPaletteGroup, ComboBoxControl, ComboBoxControlOption, Control, Element, Group, NumberFieldControl, Segment, SideBar, Tab } from "./types.ts";

function createUniqueIdGenerator() {
    let id = 0;
    return () => (id++);
}

export class SideBarBuilder {
    private sideBar: SideBar
    private generateId = createUniqueIdGenerator();

    constructor() {
        this.sideBar = {
            id: 0,
            expanded: false,
            currentTab: 0,
            tabs: [],
        };
    }

    setExpanded(expanded: boolean): this {
        this.sideBar.expanded = expanded;
        return this;
    }

    setCurrentTab(index: number): this {
        this.sideBar.currentTab = index;
        return this;
    }

    addTab(configureTab?: (builder: TabBuilder) => void): this {
        const tabBuilder = new TabBuilder(this.generateId());
        if (configureTab) {
            configureTab(tabBuilder);
        }
        this.sideBar.tabs.push(tabBuilder.build());
        return this;
    }

    build(): SideBar {
        return this.sideBar;
    }
}

export class TabBuilder {
    private tab: Tab;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.tab = {
            id,
            icon: "",
            text: "",
            segments: [],
        };
    }

    setIcon(icon: string): this {
        this.tab.icon = icon;
        return this;
    }

    setText(text: string): this {
        this.tab.text = text;
        return this;
    }

    addSegment(configureSegment?: (builder: SegmentBuilder) => void): this {
        const segmentBuilder = new SegmentBuilder(this.generateId());
        if (configureSegment) {
            configureSegment(segmentBuilder);
        }
        this.tab.segments.push(segmentBuilder.build());
        return this;
    }

    build(): Tab {
        return this.tab;
    }
}

export class SegmentBuilder {
    private segment: Segment;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.segment = {
            id: id,
            icon: undefined,
            text: "",
            groups: [],
        };
    }

    setIcon(icon?: string): this {
        this.segment.icon = icon;
        return this;
    }

    setText(text: string): this {
        this.segment.text = text;
        return this;
    }

    addNormalGroup(
        configureGroup?: (builder: GroupBuilder) => void
    ): this {
        const groupBuilder = new GroupBuilder(this.generateId());
        if (configureGroup) {
            configureGroup(groupBuilder);
        }
        this.segment.groups.push(groupBuilder.build());
        return this;
    }

    addColorPaletteGroup(
        configureGroup?: (builder: ColorPaletteGroupBuilder) => void
    ): this {
        const groupBuilder = new ColorPaletteGroupBuilder(this.generateId());
        if (configureGroup) {
            configureGroup(groupBuilder);
        }
        this.segment.groups.push(groupBuilder.build());
        return this;
    }

    build(): Segment {
        return this.segment;
    }
}

export class GroupBuilder {
    private group: Group;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.group = {
            id,
            type: "Normal",
            text: "",
            expanded: true,
            elements: [],
        };
    }

    setIcon(icon?: string): this {
        this.group.icon = icon;
        return this;
    }

    setText(text: string): this {
        this.group.text = text;
        return this;
    }

    setExpanded(expanded: boolean): this {
        this.group.expanded = expanded;
        return this;
    }

    addElement(
        configureElement?: (builder: ElementBuilder) => void
    ): this {
        const elementBuilder = new ElementBuilder(this.generateId());
        if (configureElement) {
            configureElement(elementBuilder);
        }
        this.group.elements.push(elementBuilder.build());
        return this;
    }

    build(): Group {
        return this.group;
    }
}

export class ColorPaletteGroupBuilder {
    private group: ColorPaletteGroup;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.group = {
            id,
            type: "ColorPalette",
            text: "",
            expanded: true,
            elements: [],
        };
    }

    setIcon(icon?: string): this {
        this.group.icon = icon;
        return this;
    }

    setText(text: string): this {
        this.group.text = text;
        return this;
    }

    setExpanded(expanded: boolean): this {
        this.group.expanded = expanded;
        return this;
    }

    addColorPaletteElement(
        configureElement?: (builder: ColorPaletteElementBuilder) => void
    ): this {
        const elementBuilder = new ColorPaletteElementBuilder(this.generateId());
        if (configureElement) {
            configureElement(elementBuilder);
        }
        this.group.elements.push(elementBuilder.build());
        return this;
    }

    build(): ColorPaletteGroup {
        return this.group;
    }
}

export class ElementBuilder {
    private element: Element;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.element = {
            id,
            text: "",
            controls: [],
        };
    }

    setIcon(icon?: string): this {
        this.element.icon = icon;
        return this;
    }

    setText(text: string): this {
        this.element.text = text;
        return this;
    }

    addNumberField(
        configure?: (builder: NumberFieldControlBuilder) => void
    ): this {
        const builder = new NumberFieldControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addComboBox(
        configure?: (builder: ComboBoxControlBuilder) => void
    ): this {
        const builder = new ComboBoxControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addCheckBox(
        configure?: (builder: CheckBoxControlBuilder) => void
    ): this {
        const builder = new CheckBoxControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addButton(
        configure?: (builder: ButtonControlBuilder) => void
    ): this {
        const builder = new ButtonControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    build(): Element {
        return this.element;
    }
}

export class ColorPaletteElementBuilder {
    private element: ColorPaletteElement;
    private generateId = createUniqueIdGenerator();

    constructor(id: number) {
        this.element = {
            id,
            color: tz.color(0, 0, 0),
            controls: [],
        };
    }

    setColor(color: tz.Color): this {
        this.element.color = color;
        return this;
    }

    addNumberField(
        configure?: (builder: NumberFieldControlBuilder) => void
    ): this {
        const builder = new NumberFieldControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addComboBox(
        configure?: (builder: ComboBoxControlBuilder) => void
    ): this {
        const builder = new ComboBoxControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addCheckBox(
        configure?: (builder: CheckBoxControlBuilder) => void
    ): this {
        const builder = new CheckBoxControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    addButton(
        configure?: (builder: ButtonControlBuilder) => void
    ): this {
        const builder = new ButtonControlBuilder(this.generateId());
        if (configure) {
            configure(builder);
        }
        this.element.controls.push(builder.build());
        return this;
    }

    build(): ColorPaletteElement {
        return this.element;
    }
}

export class NumberFieldControlBuilder {
    private control: NumberFieldControl;

    constructor(id: number) {
        this.control = {
            id,
            type: "NumberField",
            dataType: "Real",
            value: 0,
        };
    }

    setValue(value: number): this {
        this.control.value = value;
        return this;
    }

    setMin(min: number | undefined): this {
        this.control.min = min;
        return this;
    }

    setMax(max: number | undefined): this {
        this.control.max = max;
        return this;
    }

    setText(text: string | undefined): this {
        this.control.text = text;
        return this;
    }

    setDataType(dataType: "Real" | "Int"): this {
        this.control.dataType = dataType;
        return this;
    }

    build(): NumberFieldControl {
        return this.control;
    }
}

export class ComboBoxControlBuilder {
    private control: ComboBoxControl;

    constructor(id: number) {
        this.control = {
            id,
            type: "ComboBox",
            value: -1,
            options: [],
        };
    }

    setValue(value: number): this {
        this.control.value = value;
        return this;
    }

    addOption(option: ComboBoxControlOption): this {
        this.control.options.push(option);
        return this;
    }

    addOptions(options: Array<ComboBoxControlOption>): this {
        this.control.options.push(...options);
        return this;
    }

    build(): ComboBoxControl {
        return this.control;
    }
}

export class CheckBoxControlBuilder {
    private control: CheckBoxControl;

    constructor(id: number) {
        this.control = {
            id,
            type: "CheckBox",
            value: false,
        };
    }

    setValue(value: boolean): this {
        this.control.value = value;
        return this;
    }

    setText(text: string | undefined): this {
        this.control.text = text;
        return this;
    }

    build(): CheckBoxControl {
        return this.control;
    }
}

export class ButtonControlBuilder {
    private control: ButtonControl;

    constructor(id: number) {
        this.control = {
            id,
            type: "Button",
        };
    }

    setIcon(icon: string | undefined): this {
        this.control.icon = icon;
        return this;
    }

    setText(text: string | undefined): this {
        this.control.text = text;
        return this;
    }

    build(): ButtonControl {
        return this.control;
    }
}

export function tabByIndex(sideBar: Ref<SideBar>, tabIndex: number): Tab | null {
    const tab = sideBar.value.tabs[tabIndex];
    if (!tab) {
        console.error(`Tab index ${tabIndex} is out of bounds. There are ${sideBar.value.tabs.length} tabs.`);
        return null;
    }

    return tab;
}

export function segmentByIndex(sideBar: Ref<SideBar>, tabIndex: number, segmentIndex: number): Segment | null {
    const tab = tabByIndex(sideBar, tabIndex);
    if (!tab) {
        return null;
    }

    const segment = tab.segments[segmentIndex];
    if (!segment) {
        console.error(`Segment index ${segmentIndex} is out of bounds. There are ${tab.segments.length} segments in this tab.`);
        return null;
    }

    return segment;
}

export function groupByIndex(sideBar: Ref<SideBar>, tabIndex: number, segmentIndex: number, groupIndex: number): Group | ColorPaletteGroup | null {
    const segment = segmentByIndex(sideBar, tabIndex, segmentIndex);
    if (!segment) {
        return null;
    }

    const group = segment.groups[groupIndex];
    if (!group) {
        console.error(`Group index ${groupIndex} is out of bounds. There are ${segment.groups.length} groups in this segment.`);
        return null;
    }

    return group;
}

export function elementByIndex(sideBar: Ref<SideBar>, tabIndex: number, segmentIndex: number, groupIndex: number, elementIndex: number): Element | ColorPaletteElement | null {
    const group = groupByIndex(sideBar, tabIndex, segmentIndex, groupIndex);
    if (!group) {
        return null;
    }

    const element = group.elements[elementIndex];
    if (!element) {
        console.error(`Element index ${elementIndex} is out of bounds. There are ${group.elements.length} elements in this group.`);
        return null;
    }

    return element;
}

export function controlByIndex<T extends Control>(sideBar: Ref<SideBar>, tabIndex: number, segmentIndex: number, groupIndex: number, elementIndex: number, controlIndex: number): T | null {
    const element = elementByIndex(sideBar, tabIndex, segmentIndex, groupIndex, elementIndex);
    if (!element) {
        return null;
    }

    const control = element.controls[controlIndex];
    if (!control) {
        console.error(`Control index ${controlIndex} is out of bounds. There are ${element.controls.length} controls in this element.`);
        return null;
    }

    return control as T;
}

export function tabById(sideBar: Ref<SideBar>, tabId: number): Tab | undefined {
    return sideBar.value.tabs.find(item => item.id === tabId);
}

export function segmentById(sideBar: Ref<SideBar>, tabId: number, segmentId: number): Segment | undefined {
    const tab = tabById(sideBar, tabId);
    if (!tab) 
        return undefined;

    return tab.segments.find(item => item.id === segmentId);
}

export function groupById<T>(sideBar: Ref<SideBar>, tabId: number, segmentId: number, groupId: number): T | undefined {
    const seg = segmentById(sideBar, tabId, segmentId);
    if (!seg) 
        return undefined;

    return seg.groups.find(item => item.id === groupId) as (T | undefined);
}

export function elementById<T>(sideBar: Ref<SideBar>, tabId: number, segmentId: number, groupId: number, elementId: number): T | undefined {
    const gr = groupById<Group>(sideBar, tabId, segmentId, groupId);
    if (!gr) 
        return undefined;

    return gr.elements.find(item => item.id === elementId) as (T | undefined);
}

export function controlById<T extends Control>(sideBar: Ref<SideBar>, tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number): T | undefined {
    const elem = elementById<Element | ColorPaletteElement>(sideBar, tabId, segmentId, groupId, elementId);
    if (!elem) 
        return undefined;

    return elem.controls.find(item => item.id === controlId) as (T | undefined);
}
