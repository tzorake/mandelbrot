import { angleDownIcon, angleUpIcon, arrowsOutputIcon, constructionIcon, paletteIcon, plusIcon, settingsIcon } from "./icons.ts";
import { controlByIndex, elementByIndex, groupByIndex, segmentByIndex, SideBarBuilder, tabByIndex } from "./builder.ts";
import { ref, type Ref } from "vue";
import type { SideBar } from "./types.ts";

const DEFAULT_PALETTE = [
    { value: 0.00, color: 0xff171819 },
    { value: 0.03, color: 0xff465a78 },
    { value: 0.05, color: 0xff171882 },
    { value: 0.25, color: 0xff64b3fa },
    { value: 0.50, color: 0xff62412b },
    { value: 0.85, color: 0xff4f6e0b },
    { value: 0.95, color: 0xff4f6e96 },
    { value: 1.00, color: 0xffffffff },
];

function create(): SideBar {
    return new SideBarBuilder()
        .addTab(tab => tab
            .setIcon(constructionIcon)
            .setText("Parameters")
            .addSegment(segment => segment
                .addNormalGroup(group => group
                    .setText("Parameters")
                    .addElement(element => element
                        .setText("Real Part")
                        .addNumberField(numberField => numberField
                            .setMin(-2)
                            .setMax(2)
                        )
                    )
                    .addElement(element => element
                        .setText("Imaginaty Part")
                        .addNumberField(numberField => numberField
                            .setMin(-2)
                            .setMax(2)
                        )
                    )
                    .addElement(element => element
                        .setText("Escape Radius")
                        .addNumberField(numberField => numberField
                            .setMin(0.0)
                            .setMax(2.0)
                            .setValue(2.0)
                        )
                    )
                    .addElement(element => element
                        .setText("Maximum Iterations")
                        .addNumberField(numberField => numberField
                            .setDataType("Int")
                            .setMin(0)
                            .setValue(200)
                        )
                    )
                    .addElement(element => element
                        .setText("Step")
                        .addNumberField(numberField => numberField
                            .setDataType("Int")
                            .setMin(0)
                            .setValue(4)
                        )
                    )
                    .addElement(element => element
                        .setText("Detail Level")
                        .addNumberField(numberField => numberField
                            .setDataType("Int")
                            .setMin(0)
                            .setValue(20)
                        )
                    )
                    .addElement(element => element
                        .setText("Maximum Detail Level")
                        .addNumberField(numberField => numberField
                            .setDataType("Int")
                            .setMin(0)
                            .setValue(4)
                        )
                    )
                    .addElement(element => element
                        .setText("Space")
                        .addComboBox(comboBox => comboBox
                            .setValue(0)
                            .addOptions([
                                { first: 0, second: "Parameter Space" },
                                { first: 1, second: "Julia Space" },
                            ])
                        )
                    )
                )
            )
        )
        .addTab(tab => tab
            .setIcon(arrowsOutputIcon)
            .addSegment(segmnent => segmnent
                .addNormalGroup(group => group
                    .setText("Trasform")
                    .addElement(element => element
                        .setText("Traslation")
                        .addNumberField()
                        .addNumberField()
                    )
                    .addElement(element => element
                        .setText("Zoom")
                        .addNumberField(numberField => numberField
                            .setValue(0.005)
                        )
                    )
                    .addElement(element => element
                        .setText("Rotation")
                        .addNumberField(numberField => numberField
                            .setMin(0)
                            .setMax(2 * Math.PI)
                            .setValue(0)
                        )
                    )
                )
            )
        )
        .addTab(tab => tab
            .setIcon(paletteIcon)
            .addSegment(segmnent => segmnent
                .addColorPaletteGroup(group => DEFAULT_PALETTE
                    .reduce((group, cur) => group
                        .addColorPaletteElement(group => group
                            .setColor(cur.color)
                            .addNumberField(numberField => numberField
                                .setMin(0.0)
                                .setMax(1.0)
                                .setValue(cur.value)
                            )
                            .addButton(button => button
                                .setIcon(angleUpIcon)
                            )
                            .addButton(button => button
                                .setIcon(angleDownIcon)
                            )   
                            .addButton(button => button
                                .setIcon(plusIcon)
                            )
                        ), 
                        group.setText("Color Theme")
                    )
                )
            )
        )
        .addTab(tab => tab
            .setIcon(settingsIcon)
            .addSegment(segment => segment
                .addNormalGroup(group => group
                    .setText("Settings")
                    .addElement(element => element
                        .setText("Model Actions")
                        .addButton(button => button
                            .setText("Reload")
                        )
                    )
                )
            )
        )
        .build();
}

export const sideBar: Ref<SideBar> = ref(create());

export function reset(sideBar: Ref<SideBar>) {
    sideBar.value = create();
}

export const Tabs = {
    Parameters:         tabByIndex(sideBar, 0)!.id,
    Transform:          tabByIndex(sideBar, 1)!.id,
    ColorPalette:       tabByIndex(sideBar, 2)!.id,
    Settings:           tabByIndex(sideBar, 3)!.id,
} as const;
export type Tabs = typeof Tabs[keyof typeof Tabs];

export const Segments = {
    Parameters:         segmentByIndex(sideBar, 0, 0)!.id,
    Transform:          segmentByIndex(sideBar, 1, 0)!.id,
    ColorPalette:       segmentByIndex(sideBar, 2, 0)!.id,
    Settings:           segmentByIndex(sideBar, 3, 0)!.id,
} as const;
export type Segments = typeof Segments[keyof typeof Segments];

export const Groups = {
    Parameters:         groupByIndex(sideBar, 0, 0, 0)!.id,
    Trasform:           groupByIndex(sideBar, 1, 0, 0)!.id,
    ColorTheme:         groupByIndex(sideBar, 2, 0, 0)!.id,
    Settings:           groupByIndex(sideBar, 3, 0, 0)!.id,
} as const;
export type Groups = typeof Groups[keyof typeof Groups];

export const Elements = {
    RealPart:           elementByIndex(sideBar, 0, 0, 0, 0)!.id,
    ImaginaryPart:      elementByIndex(sideBar, 0, 0, 0, 1)!.id,
    EscapeRadius:       elementByIndex(sideBar, 0, 0, 0, 2)!.id,
    MaximumIterations:  elementByIndex(sideBar, 0, 0, 0, 3)!.id,
    Step:               elementByIndex(sideBar, 0, 0, 0, 4)!.id,
    DetailLevel:        elementByIndex(sideBar, 0, 0, 0, 5)!.id,
    MaximumDetailLevel: elementByIndex(sideBar, 0, 0, 0, 6)!.id,
    Space:              elementByIndex(sideBar, 0, 0, 0, 7)!.id,
    Traslation:         elementByIndex(sideBar, 1, 0, 0, 0)!.id,
    Zoom:               elementByIndex(sideBar, 1, 0, 0, 1)!.id,
    Rotation:           elementByIndex(sideBar, 1, 0, 0, 2)!.id,
    ModelActions:       elementByIndex(sideBar, 3, 0, 0, 0)!.id,
} as const;
export type Elements = typeof Elements[keyof typeof Elements];

export const Controls = {
    RealPart:           controlByIndex(sideBar, 0, 0, 0, 0, 0)!.id,
    ImaginaryPart:      controlByIndex(sideBar, 0, 0, 0, 1, 0)!.id,
    EscapeRadius:       controlByIndex(sideBar, 0, 0, 0, 2, 0)!.id,
    MaximumIterations:  controlByIndex(sideBar, 0, 0, 0, 3, 0)!.id,
    Step:               controlByIndex(sideBar, 0, 0, 0, 4, 0)!.id,
    DetailLevel:        controlByIndex(sideBar, 0, 0, 0, 5, 0)!.id,
    MaximumDetailLevel: controlByIndex(sideBar, 0, 0, 0, 6, 0)!.id,
    Space:              controlByIndex(sideBar, 0, 0, 0, 7, 0)!.id,
    TraslationX:        controlByIndex(sideBar, 1, 0, 0, 0, 0)!.id,
    TraslationY:        controlByIndex(sideBar, 1, 0, 0, 0, 1)!.id,
    Zoom:               controlByIndex(sideBar, 1, 0, 0, 1, 0)!.id,
    Rotation:           controlByIndex(sideBar, 1, 0, 0, 2, 0)!.id,
    ModelActions:       controlByIndex(sideBar, 3, 0, 0, 0, 0)!.id,

    InterpolatorValue:  0,
    SwapAbove:          1,
    SwapBelow:          2,
    AddColor:           3,
} as const;
export type Controls = typeof Controls[keyof typeof Controls];
