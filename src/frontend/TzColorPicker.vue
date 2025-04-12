<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import TzPopup from './TzPopup.vue';
import useClickOutside from './useClickOutside';
import { tz } from '../backend/color';

function hsv(c: tz.Color) {
	let r = tz.red(c);
	let g = tz.green(c);
	let b = tz.blue(c);

    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0, s = max === 0 ? 0 : delta / max, v = max;

    if (delta !== 0) {
        if (max === r) h = ((g - b) / delta) % 6;
        else if (max === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h *= 60;
        if (h < 0) h += 360;
    }

    return [h, s, v];
}

function hex(c: tz.Color) {
    const a = tz.alpha(c);
    const b = tz.blue(c);
    const g = tz.green(c);
    const r = tz.red(c);

    const rgba = (r << 24) | (g << 16) | (b << 8) | (a << 0);

    return `#${(rgba >>> 0).toString(16).padStart(8, "0")}`;
}

const props = defineProps<{ color: tz.Color, wheelRadius: number, pointerSize: number }>();
const emit = defineEmits<{
    (e: "control:color", color: tz.Color): void,
}>();

const popupElement = useTemplateRef("popupElement");
const colorPickerElement = useTemplateRef("colorPickerElement");

const layoutPaddiing = 10; 
// const isMouseDown = ref(false);

const value = computed(() => 0.0);

const c = computed(() => props.color);
const rgba = computed(() => hex(c.value));

const position = computed(() => {
    if (colorPickerElement.value === null) {
        return { x: props.wheelRadius, y: props.wheelRadius };
    }

    let [hue, sat, _] = hsv(c.value);

    const theta = ((hue / 180) * Math.PI + Math.PI / 2) % (2 * Math.PI);
    const dist = sat * props.wheelRadius;

    const dx = dist * Math.cos(theta);
    const dy = -dist * Math.sin(theta);

    return { x: props.wheelRadius + dx, y: props.wheelRadius + dy };
});
const x = computed(() => position.value.x);
const y = computed(() => position.value.y);

const { state: visible } = useClickOutside(colorPickerElement);

function onClick() {
    if (popupElement.value) {
        popupElement.value.show();
    }
}

function onVisibleChanged(value: boolean) {
    visible.value = value;
}

function onWheelClicked(e: MouseEvent) {
    if (colorPickerElement.value === null) {
        return;
    }

    const rect = colorPickerElement.value.getBoundingClientRect();
    const dx = e.clientX - rect.left - 10 - props.wheelRadius;
    const dy = e.clientY - rect.top - 10 - props.wheelRadius;

    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const hue = ((Math.atan2(dy, dx) - Math.PI) * 180 / Math.PI + 360) % 360;
    const sat = Math.min(dist / props.wheelRadius, 1);
    const val = 1 - value.value;

    const k5 = (5 + hue / 60) % 6;
    const r = Math.trunc((val - val * sat * Math.max(0, Math.min(k5, 4 - k5, 1))) * 255);
    const k3 = (3 + hue / 60) % 6;
    const g = Math.trunc((val - val * sat * Math.max(0, Math.min(k3, 4 - k3, 1))) * 255);
    const k1 = (1 + hue / 60) % 6;
    const b = Math.trunc((val - val * sat * Math.max(0, Math.min(k1, 4 - k1, 1))) * 255);

    const color = tz.color(r, g, b);

    emit("control:color", color);
}

onMounted(() => {
    document.addEventListener("mousemove", () => {});
});

onUnmounted(() => {
    document.removeEventListener("mousemove", () => {});
});
</script>

<template>
<div class="color-picker" ref="colorPickerElement" :style="{ 'background': `${rgba}` }" @click="onClick"></div>
<TzPopup ref="popupElement" :anchorElement="colorPickerElement" :visible="visible" @popup:visible="onVisibleChanged">
    <div class="popup__layout" :style="{ padding: `${layoutPaddiing}px` }">
        <div class="color-picker__wheel" :style="{ 'width': `${2*props.wheelRadius}px`, 'height': `${2*props.wheelRadius}px` }" @click="onWheelClicked">
            <div 
                class="color-picker__pointer" 
                ref="pointerElement" 
                :style="{ 
                    'top': `${x}px`, 
                    'left': `${y}px`, 
                    'width': `${props.pointerSize}px`, 
                    'height': `${props.pointerSize}px`, 
                    'background': `${rgba}`
                }"
            ></div>
            <div class="color-picker__layer-1"></div>
            <div class="color-picker__layer-2"></div>
            <div class="color-picker__layer-3" :style="{ 'opacity': 0.0 }"></div>
        </div>
        <div class="color-picker__slider" :style="{ 'width': `${14}px`, 'height': `${2*props.wheelRadius}px` }"></div>
    </div>
</TzPopup>
</template>

<style scoped>
.color-picker {
    width: 100%;
    border-radius: 4px;
    border: 0;
}

.popup__layout {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.color-picker__slider {
    background: linear-gradient(to bottom, white, black);
    border: 1px solid black;
    box-sizing: border-box;
}

.color-picker__wheel {
    position: relative; 
    touch-action: none;
}

.color-picker__pointer {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background-color: transparent;
    z-index: 1;
    transform: translate(-50%, -50%); 

    box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px; 
    border-radius: 50%; 
}

.color-picker__layer-1 {
    position: absolute; 
    border-radius: 50%; 
    background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); 
    transform: rotateZ(270deg); 
    inset: 0px;
}

.color-picker__layer-2 {
    position: absolute; 
    border-radius: 50%; 
    background: radial-gradient(circle closest-side, rgb(255, 255, 255), transparent); 
    inset: 0px;
}

.color-picker__layer-3 {
    background: rgb(0, 0, 0); 
    border-radius: 50%; 
    position: absolute; 
    inset: 0px; opacity: 0.1;
}
</style>
