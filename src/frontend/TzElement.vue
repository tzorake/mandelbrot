<script setup lang="ts">
import type { Element } from './types';
import TzLoader from './TzLoader.vue';

const props = defineProps<Element>();
const emit = defineEmits<{
    (e: "control:number", elementId: number, controlId: number, value: number): void,
    (e: "control:boolean", elementId: number, controlId: number, value: boolean): void,
    (e: "control:string", elementId: number, controlId: number, value: string): void,
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
</script>

<template>
<div class="element">
    <div class="element__label">
        <div class="element__icon">{{ props.icon }}</div>
        <div class="element__text">{{ props.text }}</div>
    </div>
    <div class="element__controls">
        <TzLoader 
            v-for="control in props.controls" 
            v-bind="control" 
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
}

.element__label {
    width: 40%;

    display: flex;
}

.element__text {
    display: flex;
    align-items: center;
}

.element__controls {
    width: 60%;

    display: flex;
    flex-direction: column;
    gap: 6px;
}
</style>
