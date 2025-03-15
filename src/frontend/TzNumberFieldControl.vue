<script setup lang="ts">
import { computed, nextTick, useTemplateRef } from 'vue';
import useClickOutside from './useClickOutside.ts';
import type { NumberFieldControl } from './SideBar.ts';

function clamp(value: number, min: number, max: number): number 
{
    return Math.min(Math.max(value, min), max);
}

const props = defineProps<NumberFieldControl>();
const emit = defineEmits<{
    (e: "control:value", controlId: number, value: number): void,
}>();

const numberField = useTemplateRef("number-field");
const editor = useTemplateRef("editor");

const { state: focus } = useClickOutside(numberField);

const progressPercentage = computed(() => {
    if (props.min == undefined || props.max == undefined || props.min >= props.max) 
        return 0;

    const range = props.max - props.min;
    const value = Math.max(props.min, Math.min(props.max, props.value));

    return ((value - props.min) / range) * 100;
});

function onInput(_: Event) {
    const control = editor.value;
    if (!control) 
        return;

    const value = !props.dataType || props.dataType == "Real" 
        ? parseFloat(control.value) 
        : parseInt(control.value);
    if (value == null || isNaN(value))
        return;

    const clampedValue = clamp(
        value, 
        props.min != undefined 
            ? props.min 
            : -Infinity, 
        props.max != undefined 
            ? props.max 
            : Infinity
    )

    emit("control:value", props.id, clampedValue);
}

function onClick(_: Event) {
    focus.value = true;
    nextTick(() => {
        editor.value?.focus();
    });
}

function finishEditing(_: Event) {
    const control = editor.value;
    if (!control)
        return;

    focus.value = false;
    control.blur();
}

</script>

<template>
<div class="number-field" ref="number-field" @click="onClick">
    <div 
        v-if="!focus && props.min != null && props.max != null" 
        class="progress-indicator" 
        :style="{ width: `${progressPercentage}%` }"
    ></div>
    <div class="text" :class="{ visible: !focus }">
        <span v-if="props.text != undefined">{{ props.text }}</span>
        <span>{{ props.value }}</span>
    </div>
    <input class="editor" type="text" ref="editor" @keyup.enter="finishEditing" :class="{ visible: focus }" :value="props.value" @change="onInput">
</div>
</template>

<style scoped>
.number-field {
    position: relative;

    box-sizing: border-box;
    border-radius: 4px;
    border: 0;

    background: #545454;
}

.number-field .progress-indicator {
    position: absolute;
    top: 0;
    left: 0;
    
    height: 100%;
    border-radius: 4px;
    border: 0;

    background: #4771b2;
}

.number-field .text {
    width: 100%;
    height: 100%;

    font-family: var(--font-family);
    font-size: var(--group-font-size);
    color: var(--font-color);

    display: none;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 4px;
    border: 0;
    
    position: absolute;
    z-index: 999;

    padding: 0 2px;
}

.number-field .text > span:only-child {
    margin: auto;
}

.number-field .text span {
    display: flex;
    padding: 0 10px;
}

.number-field .editor {
    width: 100%;
    height: 100%;

    font-family: var(--font-family);
    font-size: var(--group-font-size);
    color: var(--font-color);

    display: none;
    box-sizing: border-box;
    background: #222222;
    border-radius: 4px;
    border: 0;
    outline: solid transparent;

    padding: 0 2px;
}

.number-field .visible {
    display: flex;
}
</style>
