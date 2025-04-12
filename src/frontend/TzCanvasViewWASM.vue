<script setup lang="ts">
import { WASI } from '@bjorn3/browser_wasi_shim';
import { computed, onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
import type { CanvasView, PaletteEntry } from './types.ts';
import { tz } from '../backend/color.ts';
import { TweenController } from './controllers.ts';

const props = defineProps<CanvasView>();
const emit = defineEmits<{
    (e: "step", value: number): void,
    (e: "translation:x", value: number): void,
    (e: "translation:y", value: number): void,
    (e: "zoom", value: number): void,
    (e: "radians", value: number): void,
}>();

const tweenController = new TweenController();
const TWEEN_DURATION = 300;

const canvasElement = useTemplateRef("canvasElement");
const fpsElement = useTemplateRef("fpsElement");

let palette = computed(() => props.palette);

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

type WasmExports = {
	memory: WebAssembly.Memory;
	compute: () => boolean;
	main: (argc: number, argv: number) => void;
	pixelsLen: () => number;
	pixelsPtr: () => number;
	setSize: (width: number, heihgt: number) => void;
	setRealPart: (realPart: number) => void;
	setImagPart: (imagPart: number) => void;
	setEscapeRadiusSquared: (escapeRadiusSquared: number) => void;
	setMaximumIterations: (maximumIterations: number) => void;
	setStep: (step: number) => void;
	setDetailLevel: (detailLevel: number) => void;
	setMaximumDetailLevel: (maximumDetailLevel: number) => void;
	setSpace: (space: number) => void;
	setTranslationX: (translationX: number) => void;
	setTranslationY: (translationY: number) => void;
	setZoom: (zoom: number) => void;
	setRotation: (radians: number) => void;
	__heap_base: WebAssembly.Global;
	__indirect_function_table: WebAssembly.Table;
	_start: () => void;
} 

const wasi = new WASI([], [], []);
function wasiExports() {
	return wasi.inst.exports as WasmExports;
}

type WasmInstance = {
	exports: {
		memory: WebAssembly.Memory;
		_start: () => unknown;
	};
};

async function start() {
    try {
		const wasm = await WebAssembly.compileStreaming(fetch("/src/backend/main.wasm"));
		const inst = await WebAssembly.instantiate(wasm, {
			wasi_snapshot_preview1: wasi.wasiImport,
			env: {
				tzjs_interpolate: interpolate,

				__cxa_allocate_exception(size: number) {
					console.warn(`__cxa_allocate_exception called with size: ${size}`);

					return 0;
				},
				__cxa_throw(ptr: number, type: number, destructor: number) {
					console.error(`__cxa_throw called with ptr: ${ptr}, type: ${type}, destructor: ${destructor}`);

					throw new Error('__cxa_throw was called but is stubbed.');
				},
				__cxa_free_exception(exception: number) {
					console.warn("Stubbed __cxa_free_exception:", exception);
				},
			},
		});
		wasi.start(inst as WasmInstance);
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
	
	const exports = wasiExports();

	exports.setRealPart(props.realPart);
	exports.setImagPart(props.imagPart);
	exports.setEscapeRadiusSquared(props.escapeRadius * props.escapeRadius);
	exports.setMaximumIterations(props.maximumIterations);
	exports.setStep(props.step);
	exports.setDetailLevel(props.detailLevel);
	exports.setMaximumDetailLevel(props.maximumDetailLevel);
	exports.setSpace(props.space);
	exports.setTranslationX(props.translationX);
	exports.setTranslationY(props.translationY);
	exports.setZoom(props.zoom);
	exports.setRotation(props.radians);

	ctx = canvasElement.value.getContext("2d");

	canvasObserver = new ResizeObserver(onCanvasResized);
	canvasObserver.observe(canvasElement.value);
	onCanvasResized();

	animationFrameHandle = requestAnimationFrame(renderLoop);
});

watch(() => props.realPart, value => wasiExports().setRealPart(value));
watch(() => props.imagPart, value => wasiExports().setImagPart(value));
watch(() => props.escapeRadius, value => wasiExports().setEscapeRadiusSquared(value * value));
watch(() => props.maximumIterations, value => wasiExports().setMaximumIterations(value));
watch(() => props.step, value => wasiExports().setStep(value));
watch(() => props.detailLevel, value => wasiExports().setDetailLevel(value));
watch(() => props.maximumDetailLevel, value => wasiExports().setMaximumDetailLevel(value));
watch(() => props.space, value => wasiExports().setSpace(value));
watch(() => props.translationX, value => wasiExports().setTranslationX(value));
watch(() => props.translationY, value => wasiExports().setTranslationY(value));
watch(() => props.zoom, value => wasiExports().setZoom(value));
watch(() => props.radians, value => wasiExports().setRotation(value));

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

	const exports = wasiExports();

	exports.setSize(canvasWidth, canvasHeight);

	pixels = new Uint8ClampedArray(exports.memory.buffer, exports.pixelsPtr(), 4*exports.pixelsLen());
	imageData =  new ImageData(pixels, canvasWidth, canvasHeight);
}

const ZOOM_RATIO = 7 / 12;
const INVERTED_ZOOM_RATIO = 1 / ZOOM_RATIO;
const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function onWheel(event: WheelEvent): void {
    event.preventDefault();

	emit("step", props.detailLevel);

	const zoom = props.zoom;
	const newZoom = event.deltaY >= 0 ? props.zoom * ZOOM_RATIO : props.zoom * INVERTED_ZOOM_RATIO;

	tweenController.addTween("zoom", zoom, newZoom, TWEEN_DURATION, easeInOutQuad);
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
	if (wasiExports().compute()) {
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

    const values = tweenController.update(timestamp);

    if (values.has("zoom")) {
        emit("zoom", values.get("zoom")!);
    }

	const deltaTime = timestamp - prevoiusTimestamp;
    prevoiusTimestamp = timestamp;

    update(deltaTime);
    render(deltaTime);

	updateFps(timestamp);
}

/////////////////////////////////////////////////

function onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    if (event.touches.length === 1) {
        isLeftButtonPressed = true;
		isAltKeyPressed = event.altKey;
		startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
		previousTranslationX = props.translationX;
		previousTranslationY = props.translationY;
		previousRadians = props.radians;
    }
	else if (event.touches.length === 2) {
        const [touch1, touch2] = Array.from(event.touches);
        previousTouchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        previousTouchAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);
    }
}

let previousTouchDistance: number | null = null;
let previousTouchAngle: number | null = null;

function onTouchMove(event: TouchEvent): void {
    event.preventDefault();

    if (!canvasElement.value || startX === null || startY === null)
		return;

    if (event.touches.length === 1 && isLeftButtonPressed) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        emit("step", props.detailLevel);
        emit("translation:x", previousTranslationX - (Math.cos(-props.radians) * deltaX + Math.sin(-props.radians) * deltaY) * props.zoom);
        emit("translation:y", previousTranslationY - (-Math.sin(-props.radians) * deltaX + Math.cos(-props.radians) * deltaY) * props.zoom);
    } 
	else if (event.touches.length === 2) {
        const [touch1, touch2] = Array.from(event.touches);

        const newTouchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        const newTouchAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);

        if (previousTouchDistance !== null && previousTouchAngle !== null) {
            const zoomFactor = newTouchDistance / previousTouchDistance;
            emit("zoom", props.zoom * zoomFactor);

            const angleDelta = newTouchAngle - previousTouchAngle;
            emit("radians", ((props.radians + angleDelta) % TWO_PI + TWO_PI) % TWO_PI);
        }

        previousTouchDistance = newTouchDistance;
        previousTouchAngle = newTouchAngle;
    }
}

function onTouchEnd(event: TouchEvent): void {
    event.preventDefault();
	isLeftButtonPressed = false;
	isAltKeyPressed = false;
	startX = null;
	startY = null;
	previousTouchDistance = null;
	previousTouchAngle = null;
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
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
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
