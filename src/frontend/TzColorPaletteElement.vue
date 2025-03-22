<script setup lang="ts">
import type { ColorPaletteElement } from './SideBar';
import TzColorPicker from './TzColorPicker.vue';
import TzLoader from './TzLoader.vue';

const props = defineProps<ColorPaletteElement>();
const emit = defineEmits<{
    (e: "control:value", elementId: number, controlId: number, value: number | boolean): void,
    (e: "control:color", elementId: number, value: string): void,
}>();

function onElementInput(controlId: number, value: number | boolean) {
    emit("control:value", props.id, controlId, value);
}

function onColorInput(value: string) {
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
            @control:value="onElementInput"
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
