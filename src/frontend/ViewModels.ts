import { ref, type Ref } from "vue";
import type { ButtonControl, ComboBoxControl, NumberFieldControl, SideBar } from "./SideBar.ts";

export const sideBar: Ref<SideBar> = ref({
    id: 0,
    expanded: true,
    currentTab: 0,
    tabs: [
        {
            id: 0,
            icon: "",
            hint: "",
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
                                            value: 0.0
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
                                            value: 0.0
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
                                    text: "Detail level",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.0,
                                            dataType: "Int",
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 4,
                            text: "Maximum detail level",
                            expanded: true,
                            elements: [
                            {
                                    id: 0,
                                    icon: "",
                                    text: "Maximum detail level",
                                    controls: [
                                        {
                                            id: 0,
                                            type: "NumberField",
                                            value: 0.0,
                                            dataType: "Int",
                                        } as NumberFieldControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 5,
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
                                                { first: 0,  second: "c" },
                                                { first: 1, second: "z0" },
                                            ]
                                        } as ComboBoxControl,
                                    ],
                                },
                            ],
                        },
                        {
                            id: 6,
                            type: "ColorPalette",
                            color: "#ffffff",
                            text: "Colors",
                            expanded: true,
                            elements: Array.from({ length: 3 }).map((_, index) => ({
                                id: index,
                                color: "#ffffff",
                                controls: [
                                    {
                                        id: 0,
                                        type: "NumberField",
                                        value: 0.0,
                                        dataType: "Int",
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
        {
            id: 1,
            icon: "",
            hint: "",
            segments: [
                {
                    id: 0,
                    text: "Color theme",
                    groups: [
                        {
                            id: 0,
                            type: "ColorPalette",
                            color: "#ffffff",
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
});
