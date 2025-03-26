<script setup lang="ts">
import { computed } from 'vue';
import TzCanvasView from './frontend/TzCanvasView.vue';
import TzSideBar from './frontend/TzSideBar.vue';
import { canvasView as canvasViewInitialState, sideBar as sideBarInitialState } from './frontend/models.ts';
import { Space, type ButtonControl, type CanvasViewProps, type ColorPaletteElement, type ColorPaletteGroup, type ComboBoxControl, type Control, type Element, type Group, type NumberFieldControl, type SideBar } from './frontend/types.ts';
import { usePersistState } from './frontend/usePersistState.ts';
import { angleDownIcon, angleUpIcon, plusIcon } from './frontend/icons.ts';
import TzCanvasViewGPU from './frontend/TzCanvasViewGPU.vue';

const ENABLE_LOCAL_STORAGE = false;

const sideBarKey = "SideBar";
const { state: sideBar } = usePersistState<SideBar>(sideBarKey, sideBarInitialState, ENABLE_LOCAL_STORAGE);

const canvasViewKey = "CanvasView";
const { state: canvasView} = usePersistState<CanvasViewProps>(canvasViewKey, canvasViewInitialState, ENABLE_LOCAL_STORAGE);

function group<T>(tabId: number, segmentId: number, groupId: number): T | null {
    const tab = sideBar.value.tabs.find(item => item.id === tabId);
    if (!tab) 
        return null;

    const segment = tab.segments.find(item => item.id === segmentId);
    if (!segment) 
        return null;

    return segment.groups.find(item => item.id === groupId) as T;
}

function element<T>(tabId: number, segmentId: number, groupId: number, elementId: number): T | null {
    const gr = group<Group>(tabId, segmentId, groupId);
    if (!gr) 
        return null;

    return gr.elements.find(item => item.id === elementId) as T;
}

function control<T extends Control>(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number): T | null {
    const elem = element<Element | ColorPaletteElement>(tabId, segmentId, groupId, elementId);
    if (!elem) 
        return null;

    return elem.controls.find(item => item.id === controlId) as T;
}

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

function randomColorFromId(id: number): string {
    const r = ((pseudoRandom(id + 0)) >> 16) & 0xff;
    const g = ((pseudoRandom(id + 1)) >> 8 ) & 0xff;
    const b = ((pseudoRandom(id + 2)) >> 0 ) & 0xff;
    const a = ((pseudoRandom(id + 3)) >> 0 ) & 0xff;

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
}

const realPart = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 0, 0, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const imagPart = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 0, 1, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const escapeRadius = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 1, 0, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const maximumIterations = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 2, 0, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 0.0;
    }

    return ctl.value;
});
const step = computed({
    get() {
        const ctl = control<NumberFieldControl>(0, 0, 3, 0, 0);
        if (ctl == null) {
            console.error("control should return a valid object");
            return 0;
        }

        return ctl.value;
    },
    set(value: number) {
        const ctl = control<NumberFieldControl>(0, 0, 3, 0, 0);
        if (ctl == null) {
            console.error("control should return a valid object");
            return;
        }

        ctl.value = value;
    }
});
const detailLevel = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 3, 1, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 1;
    }

    return ctl.value;
});
const maximumDetailLevel = computed(() => {
    const ctl = control<NumberFieldControl>(0, 0, 3, 2, 0);
    if (ctl == null) {
        console.error("control should return a valid object");
        return 1;
    }

    return ctl.value;
});
const space = computed(() => {
    const gr = group<ColorPaletteGroup>(0, 0, 4);
    if (gr == null) {
        console.error("control should return a valid object");
        return Space.PARAMETER_SPACE;
    }

    const value = (gr.elements[0].controls[0] as ComboBoxControl).value;
    return value !== Space.DYNAMIC_SPACE ? Space.PARAMETER_SPACE : Space.DYNAMIC_SPACE;
});
const palette = computed(() => {
    const gr = group<ColorPaletteGroup>(0, 0, 5);
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
    const tab = sideBar.value.tabs.find(item => item.id === tabId);
    if (tab == undefined) {
        console.error((`Current tab not found.`));
        return;
    }

    const segment = tab!.segments.find(item => item.id === segmentId);
    if (segment == undefined) {
        console.error(`Segment with id ${segmentId} not found.`);
        return;
    } 

    const group = segment!.groups.find(item => item.id === groupId);
    if (group == undefined)  {
        console.error(`Group with id ${groupId} not found.`);
        return;
    }

	group!.expanded = value;
}

function onNumberInput(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: number) {
    const ctl = control<Control>(tabId, segmentId, groupId, elementId, controlId);
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
    const ctl = control<Control>(tabId, segmentId, groupId, elementId, controlId);
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

function onButtonClicked(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean) {
    if (segmentId === 0 && groupId === 5) {
        if (controlId === 1) {
            const gr = group<ColorPaletteGroup>(tabId, segmentId, groupId);
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

        if (controlId === 2) {
            const gr = group<ColorPaletteGroup>(tabId, segmentId, groupId);
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

        if (controlId === 3) {
            const gr = group<ColorPaletteGroup>(tabId, segmentId, groupId);
            if (gr == null)
                return;

            const firstIndex = gr.elements.findIndex(item => item.id === elementId);
            if (firstIndex === -1)
                return;

            const takeNext = firstIndex + 1 < gr.elements.length;
            const secondIndex = takeNext ? firstIndex + 1 : firstIndex - 1;
            
            const first = (gr.elements[firstIndex].controls[0] as NumberFieldControl).value;
            const second = (gr.elements[secondIndex].controls[0] as NumberFieldControl).value;

            const value = (takeNext ? second + first : first + second) / 2;

            const id = firstAvailableId(gr.elements);
            const elem = {
                id,
                color: randomColorFromId(id),
                controls: [
                    {
                        id: 0,
                        type: "NumberField",
                        value,
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
            } as ColorPaletteElement;

            gr.elements.splice(takeNext ? secondIndex : firstIndex, 0, elem);
        }
    }
}

function onStringInput(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number, value: string) {
    const ctl = control<Control>(tabId, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        default: {
            value;
            console.error("unknown control");
        }
    }
}

function onColorChanged(tabId: number, segmentId: number, groupId: number, elementId: number, value: string) {
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
	canvasView.value.translationX = value;
}

function onTranslationYChanged(value: number) {
	canvasView.value.translationY = value;
}

function onZoomChanged(value: number) {
	canvasView.value.zoom = value;
}

function onRadiansChanged(value: number) {
	canvasView.value.radians = value;
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
<TzCanvasViewGPU
    v-bind="canvasView"

    :realPart="realPart"
    :imagPart="imagPart"
    :escapeRadius="escapeRadius"
    :maximumIterations="maximumIterations"
    :step="step"
    :detailLevel="detailLevel"
    :maximumDetailLevel="maximumDetailLevel"
    :palette="palette"
    :space="space"

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
