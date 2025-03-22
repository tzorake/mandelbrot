<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import Vector2 from '../backend/vector2.ts';
import Complex, { cmult, csum } from '../backend/complex.ts';
import { mlmult, mmultv } from '../backend/matrix3.ts';
import { scale as S, rotate as R, translate as T } from '../backend/transform2.ts';
import ColorInterpolator from '../backend/colorinterpolator.ts';
import Color from '../backend/color.ts';
import { Arenas } from '../backend/arenas.ts';
import type { CanvasView } from './SideBar.ts';

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

let realPart = computed(() => props.realPart);
let imagPart = computed(() => props.imagPart);
let escapeRadius = computed(() => props.escapeRadius);
let maximumIterations = computed(() => props.maximumIterations);
let detailLevel = computed(() => props.detailLevel);
let maximumDetailLevel = computed(() => props.maximumDetailLevel);

let translationX = computed(() => props.translationX);
let translationY = computed(() => props.translationY);
let previousTranslation = Vector2.ZERO;
let zoom = computed(() => props.zoom);
let radians = computed(() => props.radians);
let step = computed(() => props.step);

let ctx: CanvasRenderingContext2D | null = null;
let buffer: ArrayBuffer;
let pixels: Uint8ClampedArray;
let imageData: ImageData;

let isLeftButtonPressed = false;
let startX: number | null = null;
let startY: number | null = null;

const palette = new ColorInterpolator();
palette.set(0.0,  Color.fromString("#191817ff"));
palette.set(0.03, Color.fromString("#785a46ff"));
palette.set(0.05, Color.fromString("#821817ff"));
palette.set(0.25, Color.fromString("#fab364ff"));
palette.set(0.5,  Color.fromString("#2b4162ff"));
palette.set(0.85, Color.fromString("#0b6e4fff"));
palette.set(0.95, Color.fromString("#966e4fff"));
palette.set(1.0,  Color.fromString("#ffffffff"));

let canvasObserver: ResizeObserver;
let animationFrameHandle: number; 

onMounted(() => {
	Arenas.instantiate();

	if (canvasElement.value === null) {
		console.error("canvasElement.value should not be null");
		return;
	}
		
	ctx = canvasElement.value.getContext("2d");

	canvasObserver = new ResizeObserver(onCanvasResized);
	canvasObserver.observe(canvasElement.value);
	onCanvasResized();

	animationFrameHandle = requestAnimationFrame(renderLoop);
});

onUnmounted(() => {
	cancelAnimationFrame(animationFrameHandle);
	Arenas.destroy();
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

	buffer = new ArrayBuffer(canvasWidth * canvasHeight * 4);
	pixels = new Uint8ClampedArray(buffer);
	imageData =  new ImageData(pixels, canvasWidth, canvasHeight);
}

function onWheel(event: WheelEvent): void {
    event.preventDefault();

	emit("step", detailLevel.value);
	emit("zoom", event.deltaY >= 0 ? zoom.value * 10 / 11 : zoom.value * 11 / 10);
}

function onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = true;
		startX = event.clientX;
        startY = event.clientY;
		previousTranslation.x = translationX.value;
		previousTranslation.y = translationY.value;
	}
}

function onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = false;
		startX = null;
        startY = null;
	}
}

function onMouseMove(event: MouseEvent): void {
	if (isLeftButtonPressed && startX !== null && startY !== null && previousTranslation !== null) {
		emit("step", detailLevel.value);
		emit("translation:x", previousTranslation.x - (event.clientX - startX) * zoom.value);
		emit("translation:y", previousTranslation.y - (event.clientY - startY) * zoom.value);
	}
}

function julia(z0_x: number, z0_y: number, c_x: number, c_y: number): { iter: number, z: Complex } {
    let iter = 0;
	let z = Complex.acquire(z0_x, z0_y);
	let c = Complex.acquire(c_x, c_y);
    while (z.x * z.x + z.y * z.y < escapeRadius.value * escapeRadius.value && iter < maximumIterations.value) {
        iter++;
		csum(cmult(z, z, true), c, true);
    }

    return { iter, z };
}

const LOG_2 = Math.log(2);

function smooth(iter: number, z: Vector2): number {
    if (iter < maximumIterations.value) {
        const nu = Math.log(Math.log(z.x * z.x + z.y * z.y) / 2 / LOG_2) / LOG_2;

        return iter + 1 - nu;
    }

    return maximumIterations.value;
}

function computeJulia() {
	if (canvasElement.value === null) {
		console.error("canvasElement.value should not be null");
		return false;
	}

	const [canvasWidth, canvasHeight] = [canvasElement.value.width, canvasElement.value.height];
	const [cx, cy] = [Math.trunc(canvasWidth / 2), Math.trunc(canvasHeight / 2)];
    for (let y = 0; y < canvasHeight; y += step.value) {
		for (let x = 0; x < canvasWidth; x += step.value) {
			const z0 = Complex.acquire(realPart.value, imagPart.value);
			const p = Vector2.acquire(x, y);
			const c = mmultv(
				mlmult(R(radians.value), T(translationX.value, translationY.value), S(zoom.value), T(-cx, -cy).neg()), 
				p
			);

			const { iter, z } = julia(z0.x, z0.y, c.x, c.y);
			const ratio = smooth(iter, z) / maximumIterations.value;
			const color = palette.interpolate(ratio);
			for (let dy = 0; dy < step.value && y + dy < canvasHeight; ++dy) {
				for (let dx = 0; dx < step.value && x + dx < canvasWidth; ++dx) {
					const index = ((y + dy) * canvasWidth + (x + dx)) * 4;
					pixels[index + 0] = color.red;
					pixels[index + 1] = color.green;
					pixels[index + 2] = color.blue;
					pixels[index + 3] = color.alpha;
				}
			}

			Arenas.releaseAll();
		}
	}

    return true;
}

let prevoiusTimestamp = 0;

function renderLoop(timestamp: number) {
    const deltaTime = timestamp - prevoiusTimestamp;
    prevoiusTimestamp = timestamp;

    update(deltaTime);
    render(deltaTime);

    requestAnimationFrame(renderLoop);

	updateFps(timestamp);
}

function update(_: number) {
	if (computeJulia()) {
		const newStep = Math.max(step.value - 1, maximumDetailLevel.value)
		if (newStep !== step.value) {
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

</script>

<template>
<div class="canvas-view">
    <canvas class="canvas" ref="canvasElement" @mousewheel="onWheel" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove"></canvas>
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
