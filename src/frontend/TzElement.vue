<script setup lang="ts">
import type { Element } from './SideBar';
import TzLoader from './TzLoader.vue';

const props = defineProps<Element>();
const emit = defineEmits<{
    (e: "control:value", elementId: number, controlId: number, value: number): void,
}>();

function onInput(controlId: number, value: number) {
    emit("control:value", props.id, controlId, value)
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
            @control:value="onInput"
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
