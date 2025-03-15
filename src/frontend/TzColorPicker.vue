<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import TzPopup from './TzPopup.vue';
import useClickOutside from './useClickOutside';

const props = defineProps<{ color: string }>();
const emit = defineEmits<{
    (e: "control:color", color: string): void,
}>();

const popup = useTemplateRef("popup");
const colorPicker = useTemplateRef("color-picker");

const { state: visible } = useClickOutside(colorPicker);

function onClick(_: Event) {
    if (popup.value)
        popup.value.show();
}

function onVisibleChanged(state: boolean) {
    visible.value = state;
}

const colorWheelSize = ref(200);
const pointerSize = ref(10);
const colorWheel = useTemplateRef("colorWheel");
const pointer = useTemplateRef("pointer");
const sliderBar = useTemplateRef("sliderBar");
const sliderCursor = useTemplateRef("sliderCursor");
const value = ref(0.150);
const x = ref(colorWheelSize.value / 2);
const y = ref(colorWheelSize.value / 2);
const isMouseDown = ref(false);

function hsvToRgb(h: number, s: number, v: number) {
    let k5 = (5 + h / 60) % 6;
    let r = v - v * s * Math.max(0, Math.min(k5, 4 - k5, 1));
    let k3 = (3 + h / 60) % 6;
    let g = v - v * s * Math.max(0, Math.min(k3, 4 - k3, 1));
    let k1 = (1 + h / 60) % 6;
    let b = v - v * s * Math.max(0, Math.min(k1, 4 - k1, 1));
    return [r * 255, g * 255, b * 255];
}

const color = computed(() => {
    const dx = x.value - colorWheelSize.value / 2;
    const dy = y.value - colorWheelSize.value / 2;

    let dist = Math.sqrt(dx * dx + dy * dy);
    
    let hue = ((Math.atan2(-dy, dx) - Math.PI / 2) * 180 / Math.PI + 360) % 360;
    let sat = Math.min(dist / (colorWheelSize.value / 2), 1);

    let [r, g, b] = hsvToRgb(hue, sat, 1 - value.value);

    return `rgb(${r}, ${g}, ${b})`;
});

function onSliderClicked(e: MouseEvent) {
    const rect = sliderBar.value!.getBoundingClientRect();
    let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height - 10));
    let value = 1 - y / (rect.height - 10);
    sliderCursor.value!.style.top = `${y}px`;
    sliderCursor.value!.dataset.value = value.toFixed(2);
}

function onHandleChange(e: MouseEvent) {
    const rect = colorPicker.value?.getBoundingClientRect();

    let dx = e.clientX - rect!.left - colorWheelSize.value / 2;
    let dy = e.clientY - rect!.top - colorWheelSize.value / 2;
    const r = Math.max(0, Math.min(colorWheelSize.value / 2, Math.sqrt(dx * dx + dy * dy)));
    const phi = Math.atan2(dy, dx) - Math.PI / 2;

    x.value = colorWheelSize.value / 2 + r * Math.cos(phi);
    y.value = colorWheelSize.value / 2 + r * Math.sin(-phi);
}

function onMouseMove(e: MouseEvent) {
    if (!isMouseDown.value)
        return;

    onHandleChange(e);
}

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
});
onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove);
});

</script>

<template>
<div class="color-picker" ref="color-picker" @click="onClick">
</div>
<TzPopup ref="popup" :anchorElement="colorPicker" :visible="visible" @popup:visible="onVisibleChanged">
    <div class="layout">
        <div class="color-wheel" ref="colorWheel" :style="{ width: `${colorWheelSize}px`, height: `${colorWheelSize}px` }" @click="onHandleChange" @mousedown="isMouseDown = true" @mouseup="isMouseDown = false" @mousemove="onMouseMove">
            <div class="pointer" ref="pointer" :style="{ top: `${x}px`, left: `${y}px`, width: `${pointerSize}px`, height: `${pointerSize}px`, background: color }"></div>
            <div class="layer-1"></div>
            <div class="layer-2"></div>
            <div class="layer-3" :style="{ opacity: value }"></div>
        </div>
        <div class="value-slider" @click="onSliderClicked">
            <div class="slider-bar" ref="sliderBar" :style="{ background: `linear-gradient(to bottom, ${color}, rgb(0, 0, 0))` }"></div>
            <div class="slider-cursor" ref="sliderCursor">
                <div class="slider-thumb"></div>
            </div>
        </div>
    </div>
</TzPopup>
</template>

<style scoped>
.layout {
    display: flex;
    gap: 8px;
}

.color-picker {
    width: 100%;
    height: 18px;
    background: white;
    border-radius: 4px;
    border: 0;
}

.color-wheel {
    position: relative; touch-action: none;
}

.value-slider {
    width: 14px;
    height: 200px;
    position: relative;
    cursor: pointer;
}

.value-slider .slider-bar {
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(to bottom, white, black);
    border: 1px solid black;
    box-sizing: border-box;
}

.value-slider .slider-cursor {
    position: absolute;
    left: -1px;
    width: 14px;
    height: 8px;
    background-color: transparent;
    border: 1px solid black;
    pointer-events: none;
}

.value-slider .slider-thumb {
    box-sizing: border-box;
    border: 1px solid white;
    width: 100%;
    height: 100%;
}

.pointer {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background-color: transparent;
    z-index: 1;
    transform: translate(-50%, -50%); 

    box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px; 
    border-radius: 50%; 
    /* background-color: rgb(0, 0, 0); */
}

.layer-1 {
    position: absolute; border-radius: 50%; background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); transform: rotateZ(270deg); inset: 0px;
}

.layer-2 {
    position: absolute; border-radius: 50%; background: radial-gradient(circle closest-side, rgb(255, 255, 255), transparent); inset: 0px;
}

.layer-3 {
    background-color: rgb(0, 0, 0); border-radius: 50%; position: absolute; inset: 0px; opacity: 0.1;
}
</style>
