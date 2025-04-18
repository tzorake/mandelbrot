<script setup lang="ts">
import { computed } from 'vue';
import TzCanvasViewJS from './frontend/TzCanvasViewJS.vue';
import TzCanvasViewWASM from './frontend/TzCanvasViewWASM.vue';
import TzSideBar from './frontend/TzSideBar.vue';
import { Controls, Elements, Groups, reset, Segments, sideBar as sideBarInitialState, Tabs } from './frontend/models.ts';
import { Space, type ColorPaletteGroup, type ComboBoxControl, type Control, type Group, type NumberFieldControl, type SideBar } from './frontend/types.ts';
import { usePersistState } from './frontend/usePersistState.ts';
import { angleDownIcon, angleUpIcon, plusIcon } from './frontend/icons.ts';
import { tz } from './backend/color.ts';
import { ColorPaletteElementBuilder, controlById, groupById } from './frontend/builder.ts';

const ENABLE_LOCAL_STORAGE = true;
const SIDE_BAR_KEY = "SideBar";

const { state: sideBar } = usePersistState<SideBar>(SIDE_BAR_KEY, sideBarInitialState, ENABLE_LOCAL_STORAGE);

function firstAvailableId(items: { id: number }[]): number {
    const ids = new Set(items.map((item) => item.id));

    let id = 0; 
    while (ids.has(id)) {
        id++; 
    }

    return id;
}

function pseudoRandom(seed: number) {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    return (a * seed + c) % m;
}

function randomColorFromId(id: number): tz.Color {
    const r = ((pseudoRandom(id + 0)) >> 24) & 0xff;
    const g = ((pseudoRandom(id + 1)) >> 16) & 0xff;
    const b = ((pseudoRandom(id + 2)) >> 8 ) & 0xff;

    return tz.color(r, g, b)
}

const realPart = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.RealPart, Controls.RealPart);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const imagPart = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.ImaginaryPart, Controls.ImaginaryPart);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const escapeRadius = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.EscapeRadius, Controls.EscapeRadius);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const maximumIterations = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.MaximumIterations, Controls.MaximumIterations);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const step = computed({
    get() {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.Step, Controls.Step);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 0;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.Step, Controls.Step);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});
const detailLevel = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.DetailLevel, Controls.DetailLevel);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 1;
    }

    return ctl.value;
});
const maximumDetailLevel = computed(() => {
    const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.MaximumDetailLevel, Controls.MaximumDetailLevel);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 1;
    }

    return ctl.value;
});
const space = computed(() => {
    const ctl = controlById<ComboBoxControl>(sideBar, Tabs.Parameters, Segments.Parameters, Groups.Parameters, Elements.Space, Controls.Space);
    if (ctl == null) {
        console.error("control should return a valid object");
        return Space.PARAMETER_SPACE;
    }

    return ctl.value !== Space.DYNAMIC_SPACE ? Space.PARAMETER_SPACE : Space.DYNAMIC_SPACE;
});

const translationX = computed({
    get() {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Traslation, Controls.TraslationX);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 1;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Traslation, Controls.TraslationX);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});
const translationY = computed({
    get() {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Traslation, Controls.TraslationY);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 1;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Traslation, Controls.TraslationY);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});
const zoom = computed({
    get() {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Zoom, Controls.Zoom);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 1;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Zoom, Controls.Zoom);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});
const radians = computed({
    get() {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Rotation, Controls.Rotation);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 1;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = controlById<NumberFieldControl>(sideBar, Tabs.Transform, Segments.Transform, Groups.Trasform, Elements.Rotation, Controls.Rotation);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});

const palette = computed(() => {
    const gr = groupById<ColorPaletteGroup>(sideBar, Tabs.ColorPalette, Segments.ColorPalette, Groups.ColorTheme)
    if (gr == null) {
        console.error("control should return a valid object");
        return [];
    }

    return gr.elements.map(item => ({ id: item.id, color: item.color, value: (item.controls[0] as NumberFieldControl).value }));
});

function onCurrentTabChanged(value: number) {
	sideBar.value.currentTab = value;
}

function onSideBarExpandedChanged(value: boolean) {
	sideBar.value.expanded = value;
}

function onGroupExpandedChanged(tabId: number, segmentId: number, groupId: number, value: boolean) {
    const gr = groupById<Group | ColorPaletteGroup>(sideBar, tabId, segmentId, groupId);
    if (!gr)
        return;

	gr.expanded = value;
}

function onNumberInput(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: number) {
    const ctl = controlById(sideBar, tabId, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        case "NumberField": {
            ctl.value = value;
        } break;

        case "ComboBox": {
            ctl.value = value;
        } break;

        default: {
            console.error("unknown control");
        }
    }
}

function onBooleanInput(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean) {
    const ctl = controlById<Control>(sideBar, tabId, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        case "CheckBox": {
            ctl.value = value;
        } break;

        case "Button": {
            onButtonClicked(tabId, segmentId, groupId, elementId, controlId, value);
        } break;

        default: {
            console.error("unknown control");
        }
    }
}

function onButtonClicked(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, _: boolean) {
    if (tabId === Tabs.ColorPalette && segmentId === Segments.ColorPalette && groupId === Groups.ColorTheme) {
        if (controlId === Controls.SwapAbove) {
            const gr = groupById<ColorPaletteGroup>(sideBar, tabId, segmentId, groupId);
            if (gr == null)
                return;

            const elemIndex = gr.elements.findIndex(item => item.id === elementId);
            if (elemIndex === -1)
                return;

            if (elemIndex > 0) {
                const first = gr.elements[elemIndex];
                const second = gr.elements[elemIndex - 1];
                
                const temp = first.color;
                first.color = second.color;
                second.color = temp;
            }
        }

        if (controlId === Controls.SwapBelow) {
            const gr = groupById<ColorPaletteGroup>(sideBar, tabId, segmentId, groupId);
            if (gr == null)
                return;

            const elemIndex = gr.elements.findIndex(item => item.id === elementId);
            if (elemIndex === -1)
                return;

            if (elemIndex + 1 < gr.elements.length) {
                const first = gr.elements[elemIndex];
                const second = gr.elements[elemIndex + 1];

                const temp = first.color;
                first.color = second.color;
                second.color = temp;
            }
        }

        if (controlId === Controls.AddColor) {
            const gr = groupById<ColorPaletteGroup>(sideBar, tabId, segmentId, groupId);
            if (gr == null)
                return;

            const firstIndex = gr.elements.findIndex(item => item.id === elementId);
            if (firstIndex === -1)
                return;

            const takeNext = firstIndex + 1 < gr.elements.length;
            const secondIndex = takeNext ? firstIndex + 1 : firstIndex - 1;
            
            const first = controlById<NumberFieldControl>(sideBar, tabId, segmentId, groupId, firstIndex, Controls.InterpolatorValue);
            const second = controlById<NumberFieldControl>(sideBar, tabId, segmentId, groupId, secondIndex, Controls.InterpolatorValue);
            if (first == null || second == null)
                return;

            const value = (takeNext ? second.value + first.value : first.value + second.value) / 2;

            const id = firstAvailableId(gr.elements);
            const elem = new ColorPaletteElementBuilder(id)
                .setColor(randomColorFromId(id))
                .addNumberField(numberField => numberField
                    .setMin(0.0)
                    .setMax(1.0)
                    .setValue(value)
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
                .build();

            gr.elements.splice(takeNext ? secondIndex : firstIndex, 0, elem);
        }
    }

    if (tabId === Tabs.Settings && segmentId === Segments.Settings && groupId === Groups.Settings && elementId === Elements.ModelActions && controlId === Controls.ModelActions) {
        reset(sideBar);
    }
}

function onStringInput(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: string) {
    const ctl = controlById<Control>(sideBar, tabId, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        default: {
            value;
            console.error("unknown control");
        }
    }
}

function onColorChanged(tabId: number, segmentId: number, groupId: number, elementId: number, value: tz.Color) {
    const tab = sideBar.value.tabs.find(item => item.id === tabId);
    if (!tab) 
        return;

    const segment = tab.segments.find(item => item.id === segmentId);
    if (!segment) 
        return;

    const group = segment.groups.find(item => item.id === groupId);
    if (!group) 
        return;

    if (group.type != "ColorPalette")
        return;

    const element = group.elements.find(item => item.id === elementId);
    if (!element) 
        return;

    element.color = value;
}

function onStepChanged(value: number) {
    step.value = value;
}

function onTranslationXChanged(value: number) {
	translationX.value = value;
}

function onTranslationYChanged(value: number) {
	translationY.value = value;
}

function onZoomChanged(value: number) {
	zoom.value = value;
}

function onRadiansChanged(value: number) {
	radians.value = value;
}
</script>

<template>
<TzSideBar 
	v-bind="sideBar"
    
	@side-bar:current-tab="onCurrentTabChanged"
	@side-bar:expanded="onSideBarExpandedChanged"
	@group:expanded="onGroupExpandedChanged"
	@control:number="onNumberInput"
	@control:boolean="onBooleanInput"
	@control:string="onStringInput"
	@control:color="onColorChanged"
/>
<TzCanvasViewWASM
    :realPart="realPart"
    :imagPart="imagPart"
    :escapeRadius="escapeRadius"
    :maximumIterations="maximumIterations"
    :step="step"
    :detailLevel="detailLevel"
    :maximumDetailLevel="maximumDetailLevel"
    :space="space"
    :palette="palette"
    :translationX="translationX"
    :translationY="translationY"
    :zoom="zoom"
    :radians="radians"
    
	@step="onStepChanged"
	@translation:x="onTranslationXChanged"
	@translation:y="onTranslationYChanged"
	@zoom="onZoomChanged"
	@radians="onRadiansChanged"
/>
</template>

<style scoped>
.app {
	display: flex;
}

.canvas-view {
	flex-grow: 1;
}
</style>
