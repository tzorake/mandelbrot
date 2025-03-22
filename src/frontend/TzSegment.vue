<script setup lang="ts">
import type { Segment } from './SideBar';
import TzGroup from './TzGroup.vue';

const props = defineProps<Segment>();
const emit = defineEmits<{
    (e: "group:expanded", segmentId: number, groupId: number, value: boolean): void,
    (e: "control:value", segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean | number | string): void,
    (e: "control:color", segmentId: number, groupId: number, elementId: number, value: string): void,
}>();

function onExpanded(segmentId: number, value: boolean) {
    emit("group:expanded", props.id, segmentId, value);
}

function onInput(groupId: number, elementId: number, controlId: number, value: boolean | number | string) {
    emit("control:value", props.id, groupId, elementId, controlId, value);
}

function onColorChanged(groupId: number, elementId: number, value: string) {
    emit("control:color", props.id, groupId, elementId, value);
}
</script>

<template>
<div class="segment">
    <div class="segment__header">
        <div class="segment__icon">{{ props.icon }}</div>
        <div class="segment__text">{{ props.text }}</div>
    </div>
    <div class="segment__content">
        <TzGroup
            v-bind="group"
            v-for="group in props.groups"
            @group:expanded="onExpanded"
            @control:value="onInput"
            @control:color="onColorChanged"
        />
    </div>
</div>
</template>

<style scoped>
.segment {
    display: flex;
    flex-direction: column;

    font-size: 12px;
    padding: 0px 8px;
}

.segment__header {
    height: 36px;

    display: flex;
}

.segment__text {
    margin: auto 0;
}

.segment__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
</style>
