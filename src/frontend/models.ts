import type { ButtonControl, CanvasViewProps, ComboBoxControl, NumberFieldControl, SideBar } from "./types.ts";
import { angleDownIcon, angleUpIcon, badgeIcon, cogTransferIcon, plusIcon } from "./icons.ts";

const palette = [
    { id: 0, value: 0.00, color: "#191817ff" },
    { id: 1, value: 0.03, color: "#785a46ff" },
    { id: 2, value: 0.05, color: "#821817ff" },
    { id: 3, value: 0.25, color: "#fab364ff" },
    { id: 4, value: 0.50, color: "#2b4162ff" },
    { id: 5, value: 0.85, color: "#0b6e4fff" },
    { id: 6, value: 0.95, color: "#966e4fff" },
    { id: 7, value: 1.00, color: "#ffffffff" },
];

export const sideBar: SideBar = {
    id: 0,
    expanded: false,
    currentTab: 0,
    tabs: [
        {
            id: 0,
            icon: cogTransferIcon,
            text: "",
            segments: [
                {
                    id: 0,
                    text: "Parameters",
                    groups: [
                        {
                            id: 0,
                            text: "Constant",
                            expanded: true,
                            elements: [
                                {
                                    id: 0,
                                    text: "Real part",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.0,
                                            min: -2.0,
                                            max: 2.0,
                                        } as NumberFieldControl,
                                    ],
                                },
                                {
                                    id: 1,
                                    text: "Imaginary part",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.0,
                                            min: -2.0,
                                            max: 2.0,
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 1,
                            text: "Escape radius",
                            expanded: true,
                            elements: [
                            {
                                    id: 0,
                                    text: "Escape radius",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 2.0
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            text: "Maximum iterations",
                            expanded: true,
                            elements: [
                            {
                                    id: 0,
                                    icon: "",
                                    text: "Maximum iterations",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            dataType: "Int",
                                            value: 200
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 3,
                            text: "Detail level",
                            expanded: true,
                            elements: [
                                {
                                    id: 0,
                                    icon: "",
                                    text: "Step",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 20,
                                            dataType: "Int",
                                        } as NumberFieldControl,
                                    ],
                                },
                                {
                                    id: 1,
                                    icon: "",
                                    text: "Detail level",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 20,
                                            dataType: "Int",
                                        } as NumberFieldControl,
                                    ],
                                },
                                {
                                    id: 2,
                                    icon: "",
                                    text: "Maximum detail level",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 4,
                                            dataType: "Int",
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 4,
                            text: "Space",
                            expanded: true,
                            elements: [
                                {
                                    id: 0,
                                    icon: "",
                                    text: `Space`,
                                    controls: [
                                        {
                                            id: 0,
                                            type: "ComboBox",
                                            value: 0,
                                            options: [
                                                { first: 0, second: "c" },
                                                { first: 1, second: "z0" },
                                            ],
                                        } as ComboBoxControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 5,
                            type: "ColorPalette",
                            text: "Colors",
                            expanded: true,
                            elements: palette.map(entry => ({  // palette
                                id: entry.id,
                                color: entry.color,
                                controls: [
                                    {
                                        id: 0,
                                        type: "NumberField",
                                        value: entry.value,
                                        min: 0.0,
                                        max: 1.0,
                                    } as NumberFieldControl,
                                    {
                                        id: 1,
                                        type: "Button",
                                        icon: angleUpIcon
                                    } as ButtonControl,
                                    {
                                        id: 2,
                                        type: "Button",
                                        icon: angleDownIcon
                                    } as ButtonControl,
                                    {
                                        id: 3,
                                        type: "Button",
                                        icon: plusIcon
                                    } as ButtonControl,
                                ],
                            }))
                        },
                    ],
                },
            ],
        },
        {
            id: 1,
            icon: badgeIcon,
            text: "",
            segments: [
                {
                    id: 0,
                    text: "Color theme",
                    groups: [
                        {
                            id: 0,
                            type: "ColorPalette",
                            text: "Colors",
                            expanded: true,
                            elements: Array.from({ length: 3 }).map((_, index) => ({
                                id: index,
                                color: "#ff0000",
                                controls: [
                                    {
                                        id: 0,
                                        type: "NumberField",
                                        value: Math.trunc(1.0 / 6 * (index + 1) * 15) / 10,
                                        min: 0.0,
                                        max: 1.0,
                                    } as NumberFieldControl,
                                    {
                                        id: 1,
                                        type: "Button",
                                    } as ButtonControl,
                                    {
                                        id: 2,
                                        type: "Button",
                                    } as ButtonControl,
                                ],
                            }))
                        },
                    ],
                },
            ],
        },
    ],
};

export const canvasView: CanvasViewProps = {
    translationX: 0,
    translationY: 0,
    zoom: 0.005,
    radians: -Math.PI,
};
