<script setup lang="ts">
import { computed } from 'vue';
import TzCanvasView from './frontend/TzCanvasView.vue';
import TzSideBar from './frontend/TzSideBar.vue';
import { canvasView as canvasViewInitialState, sideBar as sideBarInitialState } from './frontend/models.ts';
import type { CanvasViewProps, Control, NumberFieldControl, SideBar } from './frontend/types.ts';
import { usePersistState } from './frontend/usePersistState.ts';

const sideBarKey = "SideBar";
const { state: sideBar } = usePersistState<SideBar>(sideBarKey, sideBarInitialState);

const canvasViewKey = "CanvasView";
const { state: canvasView} = usePersistState<CanvasViewProps>(canvasViewKey, canvasViewInitialState);

function control<T extends Control>(tabId: number, segmentId: number, groupId: number, elementId: number, controlId: number): T | null {
    const tab = sideBar.value.tabs.find(item => item.id === tabId);
    if (!tab) 
        return null;

    const segment = tab.segments.find(item => item.id === segmentId);
    if (!segment) 
        return null;

    const group = segment.groups.find(item => item.id === groupId);
    if (!group) 
        return null;

    const element = group.elements.find(item => item.id === elementId);
    if (!element) 
        return null;

    const control = element.controls.find(item => item.id === controlId);
    if (!control) 
        return null;

    return control as T;
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

function onCurrentTabChanged(value: number) {
	sideBar.value.currentTab = value;
}

function onSideBarExpandedChanged(value: boolean) {
	sideBar.value.expanded = value;
}

function onGroupExpandedChanged(segmentId: number, groupId: number, value: boolean) {
    const tab = sideBar.value.tabs.find(item => item.id === sideBar.value.currentTab);
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

function onNumberInput(segmentId: number, groupId: number, elementId: number, controlId: number, value: number) {
    const ctl = control<Control>(sideBar.value.currentTab, segmentId, groupId, elementId, controlId);
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

function onBooleanInput(segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean) {
    const ctl = control<Control>(sideBar.value.currentTab, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        case "CheckBox": {
            ctl.value = value;
        } break;

        default: {
            console.error("unknown control");
        }
    }
}

function onStringInput(segmentId: number, groupId: number, elementId: number, controlId: number, value: string) {
    const ctl = control<Control>(sideBar.value.currentTab, segmentId, groupId, elementId, controlId);
    if (!ctl) 
        return;

    switch (ctl.type) {
        default: {
            value;
            console.error("unknown control");
        }
    }
}

function onColorChanged(segmentId: number, groupId: number, elementId: number, value: string) {
    const tab = sideBar.value.tabs.find(item => item.id === sideBar.value.currentTab);
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
<TzCanvasView 
    v-bind="canvasView"

    :realPart="realPart"
    :imagPart="imagPart"
    :escapeRadius="escapeRadius"
    :maximumIterations="maximumIterations"
    :step="step"
    :detailLevel="detailLevel"
    :maximumDetailLevel="maximumDetailLevel"

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
