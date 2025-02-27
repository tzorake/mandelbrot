<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import Vector2 from './vector2.ts';
import Complex, { cmult, csum } from './complex.ts';
import Matrix3, { mlmult, mmult, mmultv } from './matrix3.ts';
import { translate as T, rotate as R, scale as S } from './transform2.ts';
import ColorInterpolator from './color_interpolator.ts';
import Color from './color.ts';

// TODO: object pool

const canvasElement = useTemplateRef("canvasElement");
const translationElement = useTemplateRef("translationElement");
const radiansElement = useTemplateRef("radiansElement");
const zoomElement = useTemplateRef("zoomElement");
const fpsElement = useTemplateRef("fpsElement");

let step = 4;
let max_iter = 200;
let r = 2.0;

let translation = Vector2.ZERO;
let previous_translation: Vector2 | null = null;
let zoom = 0.005;
let radians = -Math.PI / 6;

let ctx: CanvasRenderingContext2D | null = null;
let buffer: ArrayBuffer | null = null;
let pixels: Uint8ClampedArray | null = null;
let imageData: ImageData | null = null;

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

onMounted(() => {
	if (canvasElement.value === null)
		return;

	
	const rect = canvasElement.value.getBoundingClientRect();
	canvasElement.value.width = rect.width;
	canvasElement.value.height = rect.height;
	
	const [canvasWidth, canvasHeight] = [canvasElement.value.width, canvasElement.value.height];
	const [cx, cy] = [Math.trunc(canvasWidth / 2), Math.trunc(canvasHeight / 2)];

	translation.x = cx;
	translation.y = cy;
	
	ctx = canvasElement.value.getContext("2d");
	buffer = new ArrayBuffer(canvasWidth * canvasHeight * 4);
	pixels = new Uint8ClampedArray(buffer);
	imageData =  new ImageData(pixels, canvasWidth, canvasHeight);
});

function onWheel(event: WheelEvent): void {
    event.preventDefault();

	zoom = event.deltaY >= 0 ? zoom * 10 / 11 : zoom * 11 / 10; 
}

function onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = true;
		startX = event.clientX;
        startY = event.clientY;
		previous_translation = translation.clone();
	}
}

function onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = false;
		startX = null;
        startY = null;
		previous_translation = null;
	}
}

function onMouseMove(event: MouseEvent): void {
	if (isLeftButtonPressed && startX !== null && startY !== null && previous_translation !== null) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

		translation.x = previous_translation.x - deltaX * zoom
		translation.y = previous_translation.y - deltaY * zoom
	}
}

function julia(z0_x: number, z0_y: number, c_x: number, c_y: number): { iter: number, z: Complex } {
    let iter = 0;
	let z_next = new Complex(z0_x, z0_y);
	let c = new Complex(c_x, c_y);
    while (z_next.x * z_next.x + z_next.y * z_next.y < r * r && iter < max_iter) {
        iter++;
		z_next = csum(cmult(z_next, z_next), c);
    }

    return { iter, z: z_next };
}

function smooth(iter: number, z: Vector2): number {
    if (iter < max_iter) {
        const nu = Math.log(Math.log(z.x * z.x + z.y * z.y) / 2 / Math.log(2)) / Math.log(2);

        return iter + 1 - nu;
    }

    return max_iter;
}

function computeJulia() {
	if (canvasElement.value === null || pixels === null)
		return true;

	const [canvasWidth, canvasHeight] = [canvasElement.value.width, canvasElement.value.height];
	const [cx, cy] = [Math.trunc(canvasWidth / 2), Math.trunc(canvasHeight / 2)];
    for (let y = 0; y < canvasHeight; y += step) {
		for (let x = 0; x < canvasWidth; x += step) {
			const z0 = Complex.ZERO;
			const p = new Vector2(x, y);
			const c = mmultv(
				mlmult(T(-cx + translation.x, -cy + translation.y), S(zoom), T(-cx, -cy).neg()), 
				p
			);

			const { iter, z } = julia(z0.x, z0.y, c.x, c.y);
			const ratio = smooth(iter, z) / max_iter;
			const color = palette.interpolate(ratio);
			for (let dy = 0; dy < step && y + dy < canvasHeight; ++dy) {
				for (let dx = 0; dx < step && x + dx < canvasWidth; ++dx) {
					const index = ((y + dy) * canvasWidth + (x + dx)) * 4;
					pixels[index + 0] = color.red;
					pixels[index + 1] = color.green;
					pixels[index + 2] = color.blue;
					pixels[index + 3] = color.alpha;
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

    requestAnimationFrame(renderLoop);

	updateFps(timestamp);
}

requestAnimationFrame(renderLoop);

function update(_: number) {
	computeJulia();
}

function render(_: number) {
	if (ctx)
		ctx.putImageData(imageData!, 0, 0);
}

let prevoiusFpsUpdateTimestamp = 0;
let frameCount = 0;

function updateFps(timestamp: number) {
	frameCount++;
	const elapsedTime = timestamp - prevoiusFpsUpdateTimestamp;
	if (elapsedTime >= 1000) {
		if (translationElement.value)
			translationElement.value.textContent = `Traslation: x=${translation.x} y=${translation.y}`;

		if (radiansElement.value)
			radiansElement.value.textContent = `Radians: ${radians}`;

		if (zoomElement.value)
			zoomElement.value.textContent = `Zoom: ${zoom}`;
		
		const fps = Math.round(1000 / (elapsedTime / frameCount));
		if (fpsElement.value)
			fpsElement.value.textContent = `FPS: ${fps}`;

		frameCount = 0;
		prevoiusFpsUpdateTimestamp = timestamp;
	}
}

</script>

<template>
<canvas class="canvas" ref="canvasElement" @mousewheel="onWheel" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove"></canvas>
<div class="stats">
	<div class="translation" ref="translationElement"></div>
	<div class="zoom" ref="zoomElement"></div>
	<div class="radians" ref="radiansElement"></div>
	<div class="fps" ref="fpsElement"></div>
</div>
</template>

<style scoped>
.canvas {
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
