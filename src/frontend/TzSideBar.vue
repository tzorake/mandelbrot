<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import type { SideBar, Tab } from "./SideBar.ts";
import TzIconLoader from './TzIconLoader.vue';
import TzSegment from './TzSegment.vue';
import { badgeIcon, menuIcon } from './Icons.ts';

const props = defineProps<SideBar>();
const emit = defineEmits<{
    (e: "side-bar:current-tab", value: number): void,
    (e: "side-bar:expanded", value: boolean): void,
    (e: "group:expanded", segmentId: number, groupId: number, value: boolean): void,
    (e: "control:value", segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean | number | string): void,
    (e: "control:color", segmentId: number, groupId: number, elementId: number, value: string): void,
}>();

function onClick(_: Event) {
	emit("side-bar:expanded", !props.expanded);
}

function onTabClicked(_: Event, tab: Tab) {
	emit("side-bar:current-tab", tab.id);
	emit("side-bar:expanded", true);
}

const activeTab = computed(() => props.tabs.find(item => item.id === props.currentTab));
const segments = computed(() => activeTab.value ? activeTab.value.segments : []);

function onGroupExpanded(segmentId: number, groupId: number, value: boolean) {
    emit("group:expanded", segmentId, groupId, value);
}

function onInput(segmentId: number, groupId: number, elementId: number, controlId: number, value: boolean | number | string) {
    emit("control:value", segmentId, groupId, elementId, controlId, value);
}

function onColorChanged(segmentId: number, groupId: number, elementId: number, value: string) {
    emit("control:color", segmentId, groupId, elementId, value);
}

// ====================================================================================================

const scrollBarContainerElement = useTemplateRef("scrollBarContainerElement");
const scrollBarContentElement = useTemplateRef("scrollBarContentElement");

const scrollBarContainerElementHeight = ref(0);
const scrollBarContentElementHeight = ref(0);

const scrollBarTrackVisible = computed(() => scrollBarContainerElementHeight.value < scrollBarContentElementHeight.value);

const scrollBarThumbElementHeight = computed(() => scrollBarTrackVisible.value 
    ? Math.max(Math.trunc(scrollBarContainerElementHeight.value / (scrollBarContentElementHeight.value / scrollBarContainerElementHeight.value)), 30) 
    : 0
);

const scrollBarThumbPosition = ref(0);

let scrollBarContainerObserver: ResizeObserver;
let scrollBarContentObserver: ResizeObserver;

onMounted(() => {
    if (!scrollBarContainerElement.value)
        return;

    if (!scrollBarContentElement.value)
        return;

    scrollBarContainerObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            scrollBarContainerElementHeight.value = entry.target.getBoundingClientRect().height;
        }
    });
    scrollBarContainerObserver.observe(scrollBarContainerElement.value);

    scrollBarContentObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            scrollBarContentElementHeight.value = entry.target.getBoundingClientRect().height;
        }
    });
    scrollBarContentObserver.observe(scrollBarContentElement.value);
});

function onWheel(event: WheelEvent) {
    if (!scrollBarTrackVisible.value)
        return;

    event.preventDefault();
    scrollBarThumbPosition.value = Math.max(0, Math.min(scrollBarThumbPosition.value + event.deltaY, scrollBarContainerElementHeight.value - scrollBarThumbElementHeight.value));
}

// ====================================================================================================

</script>

<template>
<div class="side-bar">
    <div class="side-bar__column">
		<div class="side-bar__toggle" @click="onClick">
			<div class="side-bar__icon">
                <TzIconLoader :icon="menuIcon" />
			</div>
		</div>

        <div class="side-bar__tabs">
            <div class="side-bar__tab"
                v-for="tab in props.tabs"
                :key="tab.id"
                :class="{ 'active': tab.id === props.currentTab }"
                @click="(event: Event) => onTabClicked(event, tab)"
            >
                <div class="side-bar__icon--small">
                    <TzIconLoader :icon="badgeIcon" />
                </div>
            </div>
        </div>
	</div>

    <div class="side-bar__menu" :class="{ 'active': expanded }">
		<div class="side-bar__header"></div>
		<div class="side-bar__content">
            <div class="scroll-bar__container" ref="scrollBarContainerElement"  @wheel="onWheel">
                <div class="scroll-bar__content" ref="scrollBarContentElement" :style="{ 'top': `-${scrollBarThumbPosition}px` }">
                    <TzSegment 
                        v-for="segment in segments"
                        v-bind="segment"
                        :key="segment.id"
                        @group:expanded="onGroupExpanded"
                        @control:value="onInput"
                        @control:color="onColorChanged"
                    />
                </div>
                <div class="scroll-bar__track" ref="scrollBarTrackElement" v-show="scrollBarTrackVisible">
                    <div class="scroll-bar__thumb" :style="{ 'height': `${scrollBarThumbElementHeight}px`, 'top': `${scrollBarThumbPosition}px` }"></div>
                </div>
            </div>
        </div>
	</div>
</div>
</template>

<style scoped>
.side-bar__column {
    position: relative;
	width: 30px;
    height: 100%;
	z-index: 1;
	background: #1d1d1d;
}

.side-bar__menu {
	position: fixed;
	top: 0;
	left: -400px;
	width: 400px;
	height: 100%;
	transition: left 0.3s ease;

    box-sizing: border-box;
    background: #303030;
    border: 1px solid #3b3b3b;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
	border-left: 0;
}

.side-bar__menu.active {
	left: 30px;
}

.side-bar__toggle {
    width: 30px;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;

	background: #303030;
}

.side-bar__icon {
    width: 20px;
    height: 20px;
}

.side-bar__icon--small {
    width: 14px;
    height: 14px;

    display: inline-block;
}

.side-bar__tab {
    width: 30px;
    height: 26px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #272727;
    color: #a9a9a9;

    transition: filter 0.3s ease;
}

.side-bar__tab.active {
    background: #303030;
    filter: brightness(125%);
}

.side-bar__tab:not(.active):hover {
    filter: brightness(125%);
}

.side-bar__header {
    height: 26px;
}

.side-bar__content {
    height: calc(100% - 26px);
}

.scroll-bar__container {
    width: 100%;
    height: 100%;

    position: relative;
    overflow: hidden;
}

.scroll-bar__content {
    width: 100%;
    
    position: absolute;
}

.test-row {
    width: 100%;
    height: 26px;
}

.scroll-bar__track {
    position: absolute;
    top: 0;
    right: 0;
    
    width: 6px;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s;
}

.scroll-bar__thumb {
    position: absolute;
    width: 100%;
    /* height: 100px; */
    background: #888;
    border-radius: 4px;
    cursor: pointer;
	transition: top 0.3s ease;
}

</style>
