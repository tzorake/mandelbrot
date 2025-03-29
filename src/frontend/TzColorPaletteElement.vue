<script setup lang="ts">
import { tz } from '../backend/color.ts';
import type { ColorPaletteElement } from './types';
import TzColorPicker from './TzColorPicker.vue';
import TzLoader from './TzLoader.vue';

const props = defineProps<ColorPaletteElement>();
const emit = defineEmits<{
    (e: "control:number", elementId: number, controlId: number, value: number): void,
    (e: "control:boolean", elementId: number, controlId: number, value: boolean): void,
    (e: "control:string", elementId: number, controlId: number, value: string): void,
    (e: "control:color", elementId: number, value: tz.Color): void,
}>();

function onNumberInput(controlId: number, value: number) {
    emit("control:number", props.id, controlId, value)
}

function onBooleanInput(controlId: number, value: boolean) {
    emit("control:boolean", props.id, controlId, value)
}

function onStringInput(controlId: number, value: string) {
    emit("control:string", props.id, controlId, value)
}
function onColorInput(value: tz.Color) {
    emit("control:color", props.id, value);
}
</script>

<template>
<div class="element">
    <div class="element__label">
        <TzColorPicker 
            :color="props.color" 
            :wheel-radius="100"
            :pointer-size="10"
            @control:color="onColorInput" 
        />
    </div>
    <div class="element__controls">
        <TzLoader 
            v-for="(control, index) in props.controls" 
            v-bind="control" 
            :class="{ 'take-space': index === 0 }"
            @control:number="onNumberInput"
            @control:boolean="onBooleanInput"
            @control:string="onStringInput"
        />
    </div>
</div>
</template>

<style scoped>

.element {
    width: 100%;

    display: flex;
    gap: 6px;
}

.element__label {
    width: calc(40% - 6px);

    display: flex;
}

.element__text {
    display: flex;
    align-items: center;
}

.element__controls {
    width: 60%;

    display: flex;
    gap: 1px;
}

.take-space {
    flex-grow: 1;
}
</style>
