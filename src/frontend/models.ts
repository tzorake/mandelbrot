import type { ButtonControl, ComboBoxControl, NumberFieldControl, SideBar } from "./types.ts";
import { angleDownIcon, angleUpIcon, arrowsOutputIcon, constructionIcon, paletteIcon, plusIcon } from "./icons.ts";

const DEFAULT_PALETTE = [
    { id: 0, value: 0.00, color: 0x191817ff },
    { id: 1, value: 0.03, color: 0x785a46ff },
    { id: 2, value: 0.05, color: 0x821817ff },
    { id: 3, value: 0.25, color: 0xfab364ff },
    { id: 4, value: 0.50, color: 0x2b4162ff },
    { id: 5, value: 0.85, color: 0x0b6e4fff },
    { id: 6, value: 0.95, color: 0x966e4fff },
    { id: 7, value: 1.00, color: 0xffffffff },
];

export const sideBar: SideBar = {
    id: 0,
    expanded: false,
    currentTab: 0,
    tabs: [
        {
            id: 0,
            icon: constructionIcon,
            text: "Parameters",
            segments: [
                {
                    id: 0,
                    text: "",
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
                                                { first: 0, second: "Parameter Space (c-plane)" },
                                                { first: 1, second: "Julia Space (z-plane)" },
                                            ],
                                        } as ComboBoxControl,
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 1,
            icon: arrowsOutputIcon,
            text: "",
            segments: [
                {
                    id: 0,
                    text: "",
                    groups: [
                        {
                            id: 0,
                            text: "Trasform",
                            expanded: true,
                            elements: [
                                {
                                    id: 0,
                                    text: "Traslation",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.0,
                                        } as NumberFieldControl,
                                        {
                                            id: 1,
                                            type: "NumberField",
                                            value: 0.0,
                                        } as NumberFieldControl,
                                    ],
                                },
                                {
                                    id: 1,
                                    text: "Zoom",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.005,
                                        } as NumberFieldControl,
                                    ],
                                },
                                {
                                    id: 2,
                                    text: "Rotation",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0,
                                            min: 0,
                                            max: 2 * Math.PI,
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            icon: paletteIcon,
            text: "Color Theme",
            segments: [
                {
                    id: 0,
                    text: "",
                    groups: [
                        {
                            id: 0,
                            type: "ColorPalette",
                            text: "Color Theme",
                            expanded: true,
                            elements: DEFAULT_PALETTE.map(entry => ({
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
    ],
};
