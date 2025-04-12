<script setup lang="ts">
import { tz } from '../backend/color.ts';
import { badgeIcon } from './icons.ts';
import type { Group, ColorPaletteGroup } from './types.ts';
import TzColorPaletteElement from './TzColorPaletteElement.vue';
import TzElement from './TzElement.vue';
import TzIconLoader from './TzIconLoader.vue';

const props = defineProps<Group | ColorPaletteGroup>();
const emit = defineEmits<{
    (e: "group:expanded", groupId: number, value: boolean): void,
    (e: "control:number", groupItemId: number, elementId: number, controlId: number, value: number): void,
    (e: "control:boolean", groupItemId: number, elementId: number, controlId: number, value: boolean): void,
    (e: "control:string", groupItemId: number, elementId: number, controlId: number, value: string): void,
    (e: "control:color", groupItemId: number, elementId: number, value: tz.Color): void,
}>();

function onExpanded() {
    emit("group:expanded", props.id, !props.expanded);
}

function onNumberInput(elementId: number, controlId: number, value: number) {
    emit("control:number", props.id, elementId, controlId, value);
}

function onBooleanInput(elementId: number, controlId: number, value: boolean) {
    emit("control:boolean", props.id, elementId, controlId, value);
}

function onStringInput(elementId: number, controlId: number, value: string) {
    emit("control:string", props.id, elementId, controlId, value);
}

function onColorInput(elementId: number, value: tz.Color) {
    emit("control:color", props.id, elementId, value);
}
</script>

<template>
<div class="group" :style="{ gap: props.expanded ? '10px' : '0px' }">
    <div class="group__header" v-if="props.text != ''">
        <div class="group__toggle" @click="onExpanded">
            <TzIconLoader :icon="badgeIcon" />
        </div>
        <div class="group__icon">{{ props.icon }}</div>
        <div class="group__text">{{ props.text }}</div>
    </div>
    <div class="group__content" :class="{ collapsed: !props.expanded }">
        <TzElement 
            v-if="props.type !== 'ColorPalette'"
            v-for="element in props.elements"
            v-bind="element"
            @control:number="onNumberInput"
            @control:boolean="onBooleanInput"
            @control:string="onStringInput"
        />
        <TzColorPaletteElement 
            v-else
            v-for="element in props.elements"
            v-bind="element"
            @control:number="onNumberInput"
            @control:boolean="onBooleanInput"
            @control:string="onStringInput"
            @control:color="onColorInput"
        />
    </div>
</div>
</template>

<style scoped>
.group {
    display: flex;
    flex-direction: column;
    
    background-color: rgb(61, 61, 61);
    border-radius: 4px;
    padding: 8px 8px;
}

.group__header {
    height: 28px;

    display: flex;
    align-items: center;
}

.group__toggle {
    width: 12px;
    height: 12px;
    
    display: flex;
    justify-content: center;
}

.group__icon {
    display: flex;
}

.group__text {
    display: flex;

    padding-left: 6px;
}

.group__content {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.collapsed {
    height: 0px;
    visibility: hidden;
}
</style>
