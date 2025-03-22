import { computed, ref, type Ref } from "vue";
import type { ButtonControl, CanvasView, ComboBoxControl, NumberFieldControl, SideBar } from "./SideBar.ts";

export const sideBar: Ref<SideBar> = ref({
    id: 0,
    expanded: false,
    currentTab: 0,
    tabs: [
        {
            id: 0,
            icon: "",
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
                                            value: 500
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
                            color: "#ffffff",
                            text: "Colors",
                            expanded: true,
                            elements: Array.from({ length: 3 }).map((_, index) => ({
                                id: index,
                                color: index === 0 ? "#ffff00" : index === 1 ? "#00ff00" : "#0000ff",
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
            text: "",
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

export const realPart = computed(() => (sideBar.value.tabs[0].segments[0].groups[0].elements[0].controls[0] as NumberFieldControl).value);
export const imagPart = computed(() => (sideBar.value.tabs[0].segments[0].groups[0].elements[1].controls[0]as NumberFieldControl).value);
export const escapeRadius = computed(() => (sideBar.value.tabs[0].segments[0].groups[1].elements[0].controls[0] as NumberFieldControl).value);
export const maximumIterations = computed(() => (sideBar.value.tabs[0].segments[0].groups[2].elements[0].controls[0] as NumberFieldControl).value);
export const step = computed({
    get() {
        return (sideBar.value.tabs[0].segments[0].groups[3].elements[0].controls[0]as NumberFieldControl).value
    },
    set(newValue: number) {
        (sideBar.value.tabs[0].segments[0].groups[3].elements[0].controls[0]as NumberFieldControl).value = newValue;
    }
}); // computed(() => (sideBar.value.tabs[0].segments[0].groups[3].elements[0].controls[0]as NumberFieldControl).value);
export const detailLevel = computed(() => (sideBar.value.tabs[0].segments[0].groups[3].elements[1].controls[0]as NumberFieldControl).value);
export const maximumDetailLevel = computed(() => (sideBar.value.tabs[0].segments[0].groups[3].elements[2].controls[0] as NumberFieldControl).value);



export const canvasView = ref({
    maximumIteration: 200,
    radius: 2.0,

    translationX: 0,
    translationY: 0,
    zoom: 0.005,
    radians: -Math.PI,

    palette: [
        { value: 0.00, color: "#191817ff" },
        { value: 0.03, color: "#785a46ff" },
        { value: 0.05, color: "#821817ff" },
        { value: 0.25, color: "#fab364ff" },
        { value: 0.50, color: "#2b4162ff" },
        { value: 0.85, color: "#0b6e4fff" },
        { value: 0.95, color: "#966e4fff" },
        { value: 1.00, color: "#ffffffff" },
    ],
});



