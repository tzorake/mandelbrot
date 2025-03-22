<script setup lang="ts">
import type { CheckBoxControl } from './types';

const props = defineProps<CheckBoxControl>();
const emit = defineEmits<{
    (e: "control:value", controlId: number, value: boolean): void,
}>();

function onInput() {
    emit("control:value", props.id, !props.value);
}
</script>

<template>
<label class="checkbox">
    <input
        class="editor"
        type="checkbox"
        :checked="props.value"
    />
    <div 
        class="checkbox-custom" 
        :style="{ 
            background: props.value ? 'rgb(106, 141, 194)' : 'rgb(84, 84, 84)', 
            border: props.value ? 'rgb(106, 141, 194)' : 'rgb(84, 84, 84)' 
        }"
        @click="onInput"
    >
        <div class="icon" :class="{ visible: props.value }">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
            </svg>
        </div>
    </div>
    <div class="checkbox-label" @click="onInput">
        <slot>Label</slot>
    </div>
  </label>



</template>

<style scoped>
.checkbox {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    user-select: none;
    padding: 2px;
    transition: color 0.2s;

    box-sizing: border-box;
    font-family: var(--font-family);
    font-size: var(--group-font-size);
    color: var(--font-color);
}

.checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  padding: 0;
}

.checkbox-custom {
    height: 100%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    border: 1px solid rgb(84, 84, 84);
    border: 0;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    position: relative;
}

.checkbox-custom .icon {
    width: 100%;
    height: 100%;

    display: none;
}

.checkbox-custom .visible {
    display: block;
}
</style>
