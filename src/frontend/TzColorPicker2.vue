<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import TzPopup from './TzPopup.vue';
import useClickOutside from './useClickOutside';
import { computed } from '@vue/reactivity';

const props = defineProps<{ color: string, wheelRadius: number, pointerSize: number }>();
const emit = defineEmits<{
    (e: "control:color", color: string): void,
}>();

const popupElement = useTemplateRef("popupElement");
const colorPickerElement = useTemplateRef("colorPickerElement");
const sliderElement = useTemplateRef("sliderElement");

const isMouseDown = ref(false);
const x = computed(() => {
    let [hue, sat, val] = rgbToHsv(props.color);

    const theta = ((hue / 180) * Math.PI + Math.PI / 2) % (2 * Math.PI);
    const dist = sat * props.wheelRadius;

    return dist * Math.cos(theta) + props.wheelRadius;
});
const y = computed(() => {
    let [hue, sat, val] = rgbToHsv(props.color);

    const theta = ((hue / 180) * Math.PI + Math.PI / 2) % (2 * Math.PI);
    const dist = sat * props.wheelRadius;

    return -dist * Math.sin(theta) + props.wheelRadius;
});
const value = computed(() => 0);
const sliderBarElementHeight = computed(() => 0);

let sliderCursorObserver: ResizeObserver;
const sliderCursorPosition = computed(() => {
    const h = Math.max(0, sliderBarElementHeight.value - 10);
    const y = Math.trunc(Math.max(0, Math.min(value.value * h, h)));

    return y;
});

const { state: visible } = useClickOutside(colorPickerElement);

function toHex(value: number): string {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
};

function hsv(h: number, s: number, v: number): string {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(s, 1));
    v = Math.max(0, Math.min(v, 1));

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const hexR = toHex(r);
    const hexG = toHex(g);
    const hexB = toHex(b);

    return `#${hexR}${hexG}${hexB}`;
}

function rgbToHsv(color: string) {
    let r = color.startsWith('#') ? parseInt(color.length === 3 ? color[0] + color[0] : color.slice(0, 2), 16) : 0;
    let g = color.startsWith('#') ? parseInt(color.length === 3 ? color[1] + color[1] : color.slice(2, 4), 16) : 0;
    let b = color.startsWith('#') ? parseInt(color.length === 3 ? color[2] + color[2] : color.slice(4, 6), 16) : 0;

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

function onClick() {
    if (popupElement.value) {
        popupElement.value.show();
    }
}

function onVisibleChanged(value: boolean) {
    visible.value = value;
}

function onHandleChange(e: MouseEvent) {
    const rect = colorPickerElement.value?.getBoundingClientRect();

    let dx = e.clientX - rect!.left - props.wheelRadius;
    let dy = e.clientY - rect!.top - props.wheelRadius;

    let dist = Math.sqrt(dx * dx + dy * dy);
    
    let hue = ((Math.atan2(-dy, dx) - Math.PI / 2) * 180 / Math.PI + 360) % 360;
    let sat = Math.min(dist / (props.wheelRadius / 2), 1);

    emit("control:color", hsv(hue, sat, 1 - value.value));
}

function onMouseMove(event: MouseEvent) {
    if (!isMouseDown.value)
        return;

    onHandleChange(event);
}

function onSliderBarClicked(e: MouseEvent) {
    if (!colorPickerElement.value)
        return;
    
    const rect = colorPickerElement.value.getBoundingClientRect();
    const h = Math.max(0, sliderElementHeight.value - props.pointerSize);

    let dx = e.clientX - rect!.left - props.wheelRadius;
    let dy = e.clientY - rect!.top - props.wheelRadius;

    let dist = Math.sqrt(dx * dx + dy * dy);
    
    let hue = ((Math.atan2(-dy, dx) - Math.PI / 2) * 180 / Math.PI + 360) % 360;
    let sat = Math.min(dist / (props.wheelRadius / 2), 1);

    emit("control:color", hsv(hue, sat, Math.max(0, Math.min(e.clientY - rect.top, h)) / h));
}

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);

    if (!sliderElement.value)
        return;

    // sliderCursorObserver = new ResizeObserver(entries => {
    //     for (let entry of entries) {
    //         console.info(entry.target.getBoundingClientRect())
    //         sliderElementHeight.value = entry.target.getBoundingClientRect().height;
    //     }
    // });
    // sliderCursorObserver.observe(sliderElement.value);
    
    // const pos = xy(props.color);
    // x.value = pos.x;
    // y.value = pos.y;
    // console.info(props.color);
});

onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove);
});

</script>

<template>
<div class="color-picker" ref="colorPickerElement" :style="{ 'background': `${props.color}` }" @click="onClick">
</div>
<TzPopup ref="popupElement" :anchorElement="colorPickerElement" :visible="visible" @popup:visible="onVisibleChanged">
    <div class="popup__layout">
        <div 
            class="popup__color-wheel"
            ref="colorWheelElement"
            :style="{
                'width': `${props.wheelRadius}px`,
                'height': `${props.wheelRadius}px`
            }" 
            @click="onHandleChange"
            @mousemove="onMouseMove"
            @mousedown="isMouseDown = true"
            @mouseup="isMouseDown = false"
        >
            <div class="popup__pointer" 
                ref="pointerElement" 
                :style="{ 
                    'top': `${x}px`, 
                    'left': `${y}px`, 
                    'width': `${pointerSize}px`, 
                    'height': `${pointerSize}px`, 
                    'background': props.color 
                }"
            ></div>
            <div class="popup__layer-1"></div>
            <div class="popup__layer-2"></div>
            <div class="popup__layer-3" :style="{ opacity: value }"></div>
        </div>
        <div class="popup__slider-bar" @click="onSliderBarClicked" :style="{ 'width': wheelRadius }">
            <div 
                class="popup__slider" 
                ref="sliderElement" 
                :style="{ 
                    'background': `linear-gradient(to bottom, ${props.color}, rgb(0, 0, 0))` 
                }"
            ></div>
            <div 
                class="popup__slider-cursor" 
                ref="sliderCursorElement" 
                :data-value="value" 
                :style="{ 
                    'top': `${sliderCursorPosition}px` 
                }"
            >
                <div class="popup__slider-thumb"></div>
            </div>
        </div>
    </div>
</TzPopup>
</template>

<style scoped>
.color-picker {
    width: 100%;
    height: 18px;
    border-radius: 4px;
    border: 0;
}

.popup__layout {
    display: flex;
    gap: 8px;
}

.popup__color-wheel {
    position: relative; touch-action: none;
}

.popup__slider-bar {
    width: 14px;
    position: relative;
    cursor: pointer;
}

.popup__slider {
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(to bottom, white, black);
    border: 1px solid black;
    box-sizing: border-box;
}

.popup__slider-cursor {
    position: absolute;
    left: -1px;
    width: 14px;
    height: 8px;
    background-color: transparent;
    border: 1px solid black;
    pointer-events: none;
}

.popup__slider-thumb {
    box-sizing: border-box;
    border: 1px solid white;
    width: 100%;
    height: 100%;
}

.popup__pointer {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background-color: transparent;
    z-index: 1;
    transform: translate(-50%, -50%); 

    box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px; 
    border-radius: 50%; 
}

.popup__layer-1 {
    position: absolute; border-radius: 50%; background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); transform: rotateZ(270deg); inset: 0px;
}

.popup__layer-2 {
    position: absolute; border-radius: 50%; background: radial-gradient(circle closest-side, rgb(255, 255, 255), transparent); inset: 0px;
}

.popup__layer-3 {
    background-color: rgb(0, 0, 0); border-radius: 50%; position: absolute; inset: 0px; opacity: 0.1;
}
</style>



<!-- <script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
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
const sliderBarElement = useTemplateRef("sliderBarElement");
const cursorElement = useTemplateRef("cursorElement");
const value = ref(0);
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
    return [Math.trunc(r * 255), Math.trunc(g * 255), Math.trunc(b * 255)];
}

function rgb(color: string) {
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
        const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
        const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
        return [r, g, b];
    }

    return [0, 0, 0]
}

function rgbToHsv(color: string) {
    let [r, g, b] = rgb(color);
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

function xy(color: string) {
    let [hue, sat, val] = rgbToHsv(color);

    const radius = colorWheelSize.value / 2;
    const theta = ((hue / 180) * Math.PI + Math.PI / 2) % (2 * Math.PI);
    const dist = sat * radius;

    const dx = dist * Math.cos(theta);
    const dy = -dist * Math.sin(theta);

    const x = dx + radius;
    const y = dy + radius;

    return { x, y };
}

function hex(r: number, g: number, b: number) {
    return `#${[r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
}

watchEffect(() => {
    const dx = x.value - colorWheelSize.value / 2;
    const dy = y.value - colorWheelSize.value / 2;

    let dist = Math.sqrt(dx * dx + dy * dy);
    
    let hue = ((Math.atan2(-dy, dx) - Math.PI / 2) * 180 / Math.PI + 360) % 360;
    let sat = Math.min(dist / (colorWheelSize.value / 2), 1);

    let [r, g, b] = hsvToRgb(hue, sat, 1 - value.value);

    emit("control:color", hex(r, g, b));
})

const sliderBarElementHeight = ref(0);
let sliderCursorObserver: ResizeObserver;
const sliderCursorPosition = computed(() => {
    const h = Math.max(0, sliderBarElementHeight.value - 10);
    const y = Math.trunc(Math.max(0, Math.min(value.value * h, h)));

    console.info(h, y);

    return y;
})

function onSliderClicked(e: MouseEvent) {
    if (!sliderBarElement.value)
        return;
    
    const rect = sliderBarElement.value.getBoundingClientRect();
    const h = sliderBarElementHeight.value - 10;
    value.value = Math.max(0, Math.min(e.clientY - rect.top, h)) / h;
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

    if (!sliderBarElement.value)
        return;

    sliderCursorObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            console.info(entry.target.getBoundingClientRect())
            sliderBarElementHeight.value = entry.target.getBoundingClientRect().height;
        }
    });
    sliderCursorObserver.observe(sliderBarElement.value);
    
    const pos = xy(props.color);
    x.value = pos.x;
    y.value = pos.y;
    console.info(props.color);
});
onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove);
});

</script>

<template>
<div class="color-picker" ref="color-picker" :style="{ 'background': `${props.color}` }" @click="onClick">
</div>
<TzPopup ref="popup" :anchorElement="colorPicker" :visible="visible" @popup:visible="onVisibleChanged">
    <div class="layout">
        <div 
            class="color-wheel" 
            ref="colorWheel" 
            :style="{ 
                'width': `${colorWheelSize}px`, 
                'height': `${colorWheelSize}px` 
            }" 
            @click="onHandleChange" 
            @mousedown="isMouseDown = true" 
            @mouseup="isMouseDown = false" 
            @mousemove="onMouseMove"
        >
            <div class="pointer" ref="pointer" :style="{ 
                'top': `${x}px`, 
                'left': `${y}px`, 
                'width': `${pointerSize}px`, 
                'height': `${pointerSize}px`, 
                'background': props.color 
            }"></div>
            <div class="layer-1"></div>
            <div class="layer-2"></div>
            <div class="layer-3" :style="{ opacity: value }"></div>
        </div>
        <div class="value-slider" @click="onSliderClicked">
            <div class="slider-bar" ref="sliderBarElement" :style="{ background: `linear-gradient(to bottom, ${props.color}, rgb(0, 0, 0))` }"></div>
            <div class="cursor" ref="cursorElement" :data-value="value" :style="{ 'top': `${sliderCursorPosition}px` }">
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

.value-slider .cursor {
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
</style> -->
