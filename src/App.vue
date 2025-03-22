<script setup lang="ts">
import { onMounted } from 'vue';
import TzCanvasView from './frontend/TzCanvasView.vue';
import TzSideBar from './frontend/TzSideBar.vue';
import { canvasView, detailLevel, escapeRadius, imagPart, maximumDetailLevel, maximumIterations, realPart, sideBar, step } from './frontend/ViewModels.ts';

function assert(condition: boolean, message: string): boolean {
    if (!condition) {
        console.error(`Assertion failed: ${message}`);
		return false;
    }
	return true;
}

function onCurrentTabChanged(value: number) {
	sideBar.value.currentTab = value;
}

function onSideBarExpandedChanged(value: boolean) {
	sideBar.value.expanded = value;
}

function onGroupExpandedChanged(segmentId: number, groupId: number, value: boolean) {
    const tab = sideBar.value.tabs.find(item => item.id === sideBar.value.currentTab);
    if (!assert(tab != undefined, "App.onGroupExpandedChanged: Current tab not found.")) 
        return;

    const segment = tab!.segments.find(item => item.id === segmentId);
    if (!assert(segment != undefined, `App.onGroupExpandedChanged: Segment with id ${segmentId} not found.`)) 
        return;

    const group = segment!.groups.find(item => item.id === groupId);
    if (!assert(group != undefined, `App.onGroupExpandedChanged: Group with id ${groupId} not found.`)) 
        return;

	group!.expanded = value;
}

function onInput(segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean | number | string) {
    const tab = sideBar.value.tabs.find(item => item.id === sideBar.value.currentTab);
    if (!tab) 
        return;

    const segment = tab.segments.find(item => item.id === segmentId);
    if (!segment) 
        return;

    const group = segment.groups.find(item => item.id === groupId);
    if (!group) 
        return;

    const element = group.elements.find(item => item.id === elementId);
    if (!element) 
        return;

    const control = element.controls.find(item => item.id === controlId);
    if (!control) 
        return;

    if (control.type == "Button")
        return;

    if (typeof value == "string")
        return;

	control.value = value;
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

onMounted(() => {
    console.info(maximumIterations.value)
})

</script>

<template>
<TzSideBar 
	v-bind="sideBar"
	@side-bar:current-tab="onCurrentTabChanged"
	@side-bar:expanded="onSideBarExpandedChanged"
	@group:expanded="onGroupExpandedChanged"
	@control:value="onInput"
	@control:color="onColorChanged"
/>
<TzCanvasView 
    :realPart="realPart"
    :imagPart="imagPart"
    :escapeRadius="escapeRadius"
    :maximumIterations="maximumIterations"
    :step="step"
    :detailLevel="detailLevel"
    :maximumDetailLevel="maximumDetailLevel"
    v-bind="canvasView"

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
