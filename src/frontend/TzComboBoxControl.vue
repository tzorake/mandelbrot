<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import useClickOutside from './useClickOutside.ts';
import type { ComboBoxControl, ComboBoxControlOption } from './types.ts';

const props = defineProps<ComboBoxControl>();
const emit = defineEmits<{
    (e: "control:value", controlId: number, value: number): void,
}>();

function onInput(_: Event, item: ComboBoxControlOption) {
    emit("control:value", props.id, item.first);
}

const modelData = computed(() => { return props.options.find(item => item.first == props.value) });

const combobox = useTemplateRef("combobox");
const selected = useTemplateRef("selected");

const { state: focus } = useClickOutside(combobox);

function onClicked(_: Event) {
    const control = selected.value;
    if (!control)
        return;

    control.focus();
}

function onItemClicked(event: Event, item: ComboBoxControlOption) {
    focus.value = false;
    onInput(event, item);
}

function onFocus(_: Event) {
    focus.value = true;
}
</script>

<template>
<div class="combobox" ref="combobox" :class="{ active: focus }">
    <div class="selected" ref="selected" @click="onClicked" tabindex="0" @focus="onFocus">
        <div class="text">{{ modelData ? modelData.second : "" }}</div>
    </div>
    <ul class="options" :class="{ visible: focus }">
        <li class="option" 
            v-for="item in props.options" 
            :data-value="item.first" 
            :class="{ selected: value === item.first }" 
            @click="(event: Event) => onItemClicked(event, item)"
        >
            <div class="text">{{ item.second }}</div>
        </li>
    </ul>
</div>
</template>

<style scoped>
.combobox {
    box-sizing: border-box;
    font-family: var(--font-family);
    font-size: var(--group-font-size);
    color: var(--font-color);

    background: rgb(84, 84, 84);
    border-radius: 4px;
    border: 1px solid #555;
    outline: solid transparent;

    position: relative;
}

.active, :focus {
    background: rgb(68, 97, 144);
    border: 1px solid rgb(68, 97, 144);
    border-radius: 4px 4px 0 0;
}

.combobox .selected {
    height: 100%;

    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 8px;
    outline: solid transparent;
}

.combobox .selected .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.combobox .options {
    position: absolute;
    top: 100%;
    width: calc(100% + 2px);
    left: -1px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid rgb(37, 37, 35);
    background: rgb(25, 24, 24);
    box-sizing: border-box;
    display: none;
    padding: 2px;
    z-index: 1;
}

.combobox .visible {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.combobox .options .option {
    height: 18px;
    display: flex;
    align-items: center;

    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 4px;
}

.combobox .options .option:hover {
    background: rgb(63, 63, 63);
}

.combobox .options .selected {
    background: rgb(71, 113, 179) !important;
}

.combobox .options .option .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>
