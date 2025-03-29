<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { Space, type CanvasView, type PaletteEntry } from './types.ts';
import { tz } from '../backend/color.ts';

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
let space = computed(() => props.space);
let palette = computed(() => props.palette);

let translationX = computed(() => props.translationX);
let translationY = computed(() => props.translationY);
let previousTranslationX = 0;
let previousTranslationY = 0;
let zoom = computed(() => props.zoom);
let radians = computed(() => props.radians);
let step = computed(() => props.step);

const escapeRadiusSquared = computed(() => escapeRadius.value * escapeRadius.value);
const cosine = computed(() => Math.cos(radians.value));
const sine = computed(() => Math.sin(radians.value));

let ctx: CanvasRenderingContext2D | null = null;
let buffer: ArrayBuffer;
let pixels: Uint8ClampedArray;
let imageData: ImageData;

let isLeftButtonPressed = false;
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

function interpolate(colors: PaletteEntry[], t: number): tz.Color {
	if (colors.length === 0)
		return 0;

	if (colors.length === 1)
		return colors[0].color;

	let index = search(colors, t);

	if (index === -1)
		return colors[colors.length - 1].color;

	if (index === 0)
		return colors[0].color;

	const c0 = colors[index - 1];
	const c1 = colors[index];

	const t0 = c0.value; 
	const prevColor = c0.color;

	const t1 = c1.value;
	const nextColor = c1.color;

	return tz.mix(prevColor, nextColor, (t - t0) / (t1 - t0));
}

let canvasObserver: ResizeObserver;
let animationFrameHandle: number; 

onMounted(() => {
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
		previousTranslationX = translationX.value;
		previousTranslationY = translationY.value;
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
	if (isLeftButtonPressed && startX !== null && startY !== null) {
		emit("step", detailLevel.value);
		emit("translation:x", previousTranslationX - (event.clientX - startX) * zoom.value);
		emit("translation:y", previousTranslationY - (event.clientY - startY) * zoom.value);
	}
}

// ```
// fn mandelbrot(z, c) -> pair<number, number> {
// 	let iter = 0
// 	while(mag(z) < r ** 2 && iter < MAX_ITER) {
// 		z = z ** 2 + c;
// 		iter++;
// 	}
//
// 	return { iter, mag(z) };
// }
// ```
function mandelbrotImpl(z_x: number, z_y: number, c_x: number, c_y: number): { iter: number, l: number } {
    let iter = 0;
	let r = escapeRadiusSquared.value;
	let l = z_x * z_x + z_y * z_y;
    while (l < r && iter < maximumIterations.value) {
		const newZx = z_x * z_x - z_y * z_y + c_x;
        const newZy = 2 * z_x * z_y + c_y;
        z_x = newZx;
        z_y = newZy;
		l = z_x * z_x + z_y * z_y;
		iter++;
    }

    return { iter, l };
}

function mandelbrot(z_x: number, z_y: number, c_x: number, c_y: number): { iter: number, l: number }
{
	return space.value === Space.PARAMETER_SPACE ? mandelbrotImpl(z_x, z_y, c_x, c_y) : mandelbrotImpl(c_x, c_y, z_x, z_y);
}

const _2_LOG_2 = 2 * Math.log(2);
const _LOG_2 = Math.log(2);

function smooth(iter: number, l: number): number {
    if (iter < maximumIterations.value) {
        const nu = Math.log(Math.log(l) / _2_LOG_2) / _LOG_2;

        return (iter + 1 - nu) / maximumIterations.value;
    }

    return 1.0;
}

// ```
// let c = Math.cos(radians);
// let s = Math.sin(radians);
// let v = zoom;
// let x1 = translation.x;
// let y1 = translation.y;
// let x2 = -Math.trunc(canvasWidth / 2);
// let y2 = -Math.trunc(canvasHeight / 2);
// 
// ( [c, -s, 0]   [1, 0, x]   [v, 0, 0]   (      [1, 0, x2] ) )   [x]   [-(c * v * x) - c * x1 - c * v * x2 + s * v * y + s * y1 + s * v * y2]
// ( [s,  c, 0] * [0, 1, y] * [0, v, 0] * ( -1 * [0, 1, y2] ) ) * [y] = [-(s * v * y) - s * x1 - s * v * x2 - c * v * y - c * y1 - c * v * y2]
// ( [0,  0, 1]   [0, 0, 1]   [0, 0, 1]   (      [0, 0,  1] ) )   [1]   [-1]
// ```
function computeJulia() {
	if (canvasElement.value === null) {
		console.error("canvasElement.value should not be null");
		return false;
	}

	const [canvasWidth, canvasHeight] = [canvasElement.value.width, canvasElement.value.height];
	const [cx, cy] = [Math.trunc(canvasWidth / 2), Math.trunc(canvasHeight / 2)];

	const C = cosine.value;
	const S = sine.value;
	const V = zoom.value;
	const X1 = translationX.value;
	const Y1 = translationY.value;
	const X2 = -cx;
	const Y2 = -cy;

    for (let y = 0; y < canvasHeight; y += step.value) {
		for (let x = 0; x < canvasWidth; x += step.value) {
			const { iter, l } = mandelbrot(
				realPart.value, imagPart.value, 
				-(C * V * x) - C * X1 - C * V * X2 + S * V * y + S * Y1 + S * V * Y2, 
				-(S * V * y) - S * X1 - S * V * X2 - C * V * y - C * Y1 - C * V * Y2
			);
			const color = interpolate(palette.value, smooth(iter, l));
			for (let dy = 0; dy < step.value && y + dy < canvasHeight; ++dy) {
				for (let dx = 0; dx < step.value && x + dx < canvasWidth; ++dx) {
					const index = ((y + dy) * canvasWidth + (x + dx)) * 4;
					pixels[index + 0] = tz.red(color);
					pixels[index + 1] = tz.green(color);
					pixels[index + 2] = tz.blue(color);
					pixels[index + 3] = tz.alpha(color);
				}
			}
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

    animationFrameHandle = requestAnimationFrame(renderLoop);

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
