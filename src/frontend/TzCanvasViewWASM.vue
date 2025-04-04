<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
import { Space, type CanvasView, type PaletteEntry } from './types.ts';
import { tz } from '../backend/color.ts';
import { WASI } from "../backend/browser_wasi_shim.mjs";

const props = defineProps<CanvasView>();
const emit = defineEmits<{
    (e: "step", value: number): void,
    (e: "translation:x", value: number): void,
    (e: "translation:y", value: number): void,
    (e: "zoom", value: number): void,
    (e: "radians", value: number): void,
}>();

const canvasElement = useTemplateRef("canvasElement");
const fpsElement = useTemplateRef("fpsElement");

// let realPart = computed(() => props.realPart);
// let imagPart = computed(() => props.imagPart);
// let escapeRadius = computed(() => props.escapeRadius);
// let maximumIterations = computed(() => props.maximumIterations);
// let detailLevel = computed(() => props.detailLevel);
// let maximumDetailLevel = computed(() => props.maximumDetailLevel);
// let space = computed(() => props.space);
let palette = computed(() => props.palette);

// let translationX = computed(() => props.translationX);
// let translationY = computed(() => props.translationY);

// let zoom = computed(() => props.zoom);
// let radians = computed(() => props.radians);
// let step = computed(() => props.step);

// const escapeRadiusSquared = computed(() => escapeRadius.value * escapeRadius.value);
// const cosine = computed(() => Math.cos(radians.value));
// const sine = computed(() => Math.sin(radians.value));






let previousTranslationX = 0;
let previousTranslationY = 0;
let previousRadians = 0;

let ctx: CanvasRenderingContext2D | null = null;
let pixels: Uint8ClampedArray;
let imageData: ImageData;

let isLeftButtonPressed = false;
let isAltKeyPressed = false;
let startX: number | null = null;
let startY: number | null = null;

function search(arr: PaletteEntry[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = arr[mid].value;

        if (midValue >= target) {
            if (mid === 0 || arr[mid - 1].value < target) {
                return mid; 
            }
            right = mid - 1; 
        } else {
            left = mid + 1; 
        }
    }

    return -1; 
}

function interpolate(t: number): tz.Color {
	if (palette.value.length === 0)
		return 0;

	if (palette.value.length === 1)
		return palette.value[0].color;

	let index = search(palette.value, t);

	if (index === -1)
		return palette.value[palette.value.length - 1].color;

	if (index === 0)
		return palette.value[0].color;

	const c0 = palette.value[index - 1];
	const c1 = palette.value[index];

	const t0 = c0.value; 
	const prevColor = c0.color;

	const t1 = c1.value;
	const nextColor = c1.color;

	return tz.mix(prevColor, nextColor, (t - t0) / (t1 - t0));
}

const w = new WASI([], [], []);
const exportObject = {
	tzjs_interpolate: interpolate,
};
const importObject = {
    wasi_snapshot_preview1: w.wasiImport,
    env: {
        memory: new WebAssembly.Memory({initial: 10, maximum: 1024 }),
        ...exportObject,

		__cxa_allocate_exception(size: number) {
            console.warn(`__cxa_allocate_exception called with size: ${size}`);

            return 0;
        },
        __cxa_throw(ptr: number, type: number, destructor: number) {
            console.error(`__cxa_throw called with ptr: ${ptr}, type: ${type}, destructor: ${destructor}`);

            throw new Error('__cxa_throw was called but is stubbed.');
        },
        __cxa_free_exception(exception: number) {
            console.log("Stubbed __cxa_free_exception:", exception);
        },
    },
};

async function start() {
    try {
		const response = await fetch("/src/backend/main.wasm");
		const buffer = await response.arrayBuffer();
		await WebAssembly.instantiate(buffer, importObject).then(res => w.start(res.instance));
    } catch (e) {
        console.error(e);
    }
};

let canvasObserver: ResizeObserver;
let animationFrameHandle: number; 

onMounted(async () => {
	if (canvasElement.value === null) {
		console.error("canvasElement.value should not be null");
		return;
	}

	await start();
		
	w.inst.exports.setRealPart(props.realPart);
	w.inst.exports.setImagPart(props.imagPart);
	w.inst.exports.setEscapeRadiusSquared(props.escapeRadius * props.escapeRadius);
	w.inst.exports.setMaximumIterations(props.maximumIterations);
	w.inst.exports.setStep(props.step);
	w.inst.exports.setDetailLevel(props.detailLevel);
	w.inst.exports.setMaximumDetailLevel(props.maximumDetailLevel);
	w.inst.exports.setSpace(props.space);
	w.inst.exports.setTranslationX(props.translationX);
	w.inst.exports.setTranslationY(props.translationY);
	w.inst.exports.setZoom(props.zoom);
	w.inst.exports.setRotation(props.radians);

	ctx = canvasElement.value.getContext("2d");

	canvasObserver = new ResizeObserver(onCanvasResized);
	canvasObserver.observe(canvasElement.value);
	onCanvasResized();

	animationFrameHandle = requestAnimationFrame(renderLoop);
});

watch(() => props.realPart, value => w.inst.exports.setRealPart(value));
watch(() => props.imagPart, value => w.inst.exports.setImagPart(value));
watch(() => props.escapeRadius, value => w.inst.exports.setEscapeRadiusSquared(value * value));
watch(() => props.maximumIterations, value => w.inst.exports.setMaximumIterations(value));
watch(() => props.step, value => w.inst.exports.setStep(value));
watch(() => props.detailLevel, value => w.inst.exports.setDetailLevel(value));
watch(() => props.maximumDetailLevel, value => w.inst.exports.setMaximumDetailLevel(value));
watch(() => props.space, value => w.inst.exports.setSpace(value));
watch(() => props.translationX, value => w.inst.exports.setTranslationX(value));
watch(() => props.translationY, value => w.inst.exports.setTranslationY(value));
watch(() => props.zoom, value => w.inst.exports.setZoom(value));
watch(() => props.radians, value => w.inst.exports.setRotation(value));

onUnmounted(() => {
	cancelAnimationFrame(animationFrameHandle);
})

function onCanvasResized() {
	if (canvasElement.value === null) {
		console.error("canvasElement.value should not be null");
		return;
	}

	const rect = canvasElement.value.getBoundingClientRect();
	canvasElement.value.width = rect.width;
	canvasElement.value.height = rect.height;
	const [canvasWidth, canvasHeight] = [canvasElement.value.width, canvasElement.value.height];

	w.inst.exports.setSize(canvasWidth, canvasHeight);

	pixels = new Uint8ClampedArray(w.inst.exports.memory.buffer, w.inst.exports.pixelsPtr(), 4*w.inst.exports.pixelsLen());
	imageData =  new ImageData(pixels, canvasWidth, canvasHeight);
}

function onWheel(event: WheelEvent): void {
    event.preventDefault();

	emit("step", props.detailLevel);
	emit("zoom", event.deltaY >= 0 ? props.zoom * 10 / 11 : props.zoom * 11 / 10);
}

function onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = true;
		isAltKeyPressed = event.altKey;
		startX = event.clientX;
        startY = event.clientY;
		previousTranslationX = props.translationX;
		previousTranslationY = props.translationY;
		previousRadians = props.radians;
	}
}

function onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
		isLeftButtonPressed = false;
		isAltKeyPressed = false;
		startX = null;
		startY = null;
	}
}

const TWO_PI = 2 * Math.PI;

function onMouseMove(event: MouseEvent): void {
	if (!canvasElement.value)
		return;

	if (isLeftButtonPressed && startX !== null && startY !== null) {
		if (isAltKeyPressed) {
			const value = (previousRadians + (event.clientX - startX) / canvasElement.value.width * 2);

			emit("step", props.detailLevel);
			emit("radians", ((value % TWO_PI) + TWO_PI) % TWO_PI);
		} else {
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;
			
			emit("step", props.detailLevel);
			emit("translation:x", previousTranslationX - (Math.cos(-props.radians) * deltaX + Math.sin(-props.radians) * deltaY) * props.zoom);
			emit("translation:y", previousTranslationY - (-Math.sin(-props.radians) * deltaX + Math.cos(-props.radians) * deltaY) * props.zoom);
		}
	}
}

function update(_: number) {
	if (w.inst.exports.compute()) {
		const newStep = Math.max(props.step - 1, props.maximumDetailLevel)
		if (newStep !== props.step) {
			emit("step", newStep);
		}
	}
}

function render(_: number) {
	if (ctx === null) {
		console.error("ctx should not be null");
		return;
	}

	ctx.putImageData(imageData, 0, 0);
}

let prevoiusFpsUpdateTimestamp = 0;
let frameCount = 0;

function updateFps(timestamp: number) {
	frameCount++;
	const elapsedTime = timestamp - prevoiusFpsUpdateTimestamp;
	if (elapsedTime >= 1000) {
		const fps = Math.round(1000 / (elapsedTime / frameCount));
		if (fpsElement.value)
			fpsElement.value.textContent = `FPS: ${fps}`;

		frameCount = 0;
		prevoiusFpsUpdateTimestamp = timestamp;
	}
}

let prevoiusTimestamp = 0;

function renderLoop(timestamp: number) {
    animationFrameHandle = requestAnimationFrame(renderLoop);

	const deltaTime = timestamp - prevoiusTimestamp;
    prevoiusTimestamp = timestamp;

    update(deltaTime);
    render(deltaTime);

	updateFps(timestamp);
}

</script>

<template>
<div class="canvas-view">
    <canvas 
		class="canvas" 
		ref="canvasElement" 
		@mousewheel="onWheel" 
		@mousedown="onMouseDown" 
		@mouseup="onMouseUp" 
		@mousemove="onMouseMove"
	></canvas>
    <div class="stats">
        <div class="fps" ref="fpsElement"></div>
    </div>
</div>
</template>

<style scoped>
.canvas {
    display: block;
	width: 100%;
	height: 100%;
}

.stats {
	position: fixed;
	bottom: 10px;
	right: 10px;
	color: white;
	background-color: black;
	padding: 5px;
	font-family: monospace;
	z-index: 10000;
	user-select: none;
	opacity: 0.75;
	white-space: pre-wrap;
}
</style>
