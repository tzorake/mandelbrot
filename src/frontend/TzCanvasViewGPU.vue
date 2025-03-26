<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import Vector2, { cmult, csum, vec } from '../backend/vector2.ts';
import { mlmult, mmultv } from '../backend/matrix3.ts';
import { scale as S, rotate as R, translate as T } from '../backend/transform2.ts';
import Color from '../backend/color.ts';
import { Arenas } from '../backend/arenas.ts';
import { Space, type CanvasView, type PaletteEntry } from './types.ts';

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
let previousTranslation = Vector2.ZERO;
let zoom = computed(() => props.zoom);
let radians = computed(() => props.radians);
let step = computed(() => props.step);


function rgba(hex: string): [number, number, number, number] {
    hex = hex.replace(/^#/, '');

    if (hex.length === 4) {
        hex = hex
            .split('')
            .map(char => char + char)
            .join('');
    }

    if (hex.length !== 6 && hex.length !== 8) {
        return [0, 0, 0, 1];
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255;

    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const alpha = a / 255;

    return [alpha, blue, green, red];
}

const paletteEntries = computed(() => {
    return palette.value.map(entry => ({ value: entry.value, color: rgba(entry.color) }));
})

let isLeftButtonPressed = false;
let startX: number | null = null;
let startY: number | null = null;

const sharder = `
    struct Params {
        realPart: f32,
        imagPart: f32,
        escapeRadius: f32,
        maxIterations: u32,
        zoom: f32,
        radians: f32,
        translationX: f32,
        translationY: f32,
        canvasWidth: f32,
        canvasHeight: f32,
        paletteLength: u32,
    };

    struct PaletteEntry {
        value: f32,
        color: vec4<f32>,
    };

    @group(0) @binding(0) var<uniform> params: Params;
    @group(0) @binding(1) var<storage, read> palette: array<PaletteEntry>;
    @group(0) @binding(2) var my_texture: texture_storage_2d<rgba8unorm, write>;

    fn search(value: f32) -> i32 {
        var left: i32 = 0;
        var right: i32 = i32(params.paletteLength - 1);

        while (left <= right) {
            let mid: i32 = (left + right) / 2;
            let midValue: f32 = palette[mid].value;

            if (midValue >= value) {
                if (mid == 0 || palette[mid - 1].value < value) {
                    return mid;
                }
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }

    fn interpolate(t: f32) -> vec4<f32> {
        if (params.paletteLength == 0) {
            return vec4<f32>(1.0, 1.0, 1.0, 1.0);
        }

        let index: i32 = search(t);

        if (index == -1) {
            return palette[params.paletteLength - 1].color;
        }

        if (index == 0) {
            return palette[0].color;
        }

        let c0: PaletteEntry = palette[index - 1];
        let c1: PaletteEntry = palette[index];

        let t0: f32 = c0.value;
        let t1: f32 = c1.value;

        return mix(c0.color, c1.color, (t - t0) / (t1 - t0));
    }

    struct JuliaResult {
        iter: u32,
        z: vec2<f32>,
    };

    fn julia(z0: vec2<f32>, c: vec2<f32>) -> JuliaResult {
        var iter: u32 = 0u;
        var z = z0;

        while (z.x * z.x + z.y * z.y < params.escapeRadius * params.escapeRadius && iter < params.maxIterations) {
            let zx = z.x;
            let zy = z.y;
            z.x = zx * zx - zy * zy + c.x;
            z.y = 2.0 * zx * zy + c.y;
            iter += 1u;
        }

        return JuliaResult(iter, z);
    }

    const LOG_2: f32 = 0.69314718056;

    @compute @workgroup_size(8, 8)
    fn kernel(@builtin(global_invocation_id) id: vec3u) {
        let x = f32(id.x);
        let y = f32(id.y);

        if (x >= params.canvasWidth || y >= params.canvasHeight) {
            return;
        }

        let C: f32 = cos(params.radians);
        let S: f32 = sin(params.radians);
        let V: f32 = params.zoom;
        let X1: f32 = params.translationX;
        let Y1: f32 = params.translationY;
        let X2: f32 = -floor(params.canvasWidth / 2);
        let Y2: f32 = -floor(params.canvasHeight / 2);

        let space: u32 = 0;

        let z0 = vec2<f32>(params.realPart, params.imagPart);
        let c = vec2<f32>(
            -(C * V * x) - C * X1 - C * V * X2 + S * V * y + S * Y1 + S * V * Y2,
            -(S * V * x) - S * X1 - S * V * X2 - C * V * y - C * Y1 - C * V * Y2,
        );
        let result = julia(z0, c);

        let iter = result.iter;
        let z = result.z;
        let ratio = f32(iter) / f32(params.maxIterations);
        let color = interpolate(ratio);

        textureStore(my_texture, id.xy, color);
    }
`;

async function initializeComputePipeline() {
    if (!canvasElement.value) {
        return;
    }

    const context = canvasElement.value.getContext("webgpu");
    if (!context) {
        return;
    }

    const [width, height] = [canvasElement.value.width, canvasElement.value.height];
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) {
        return;
    }

    const device = await adapter.requestDevice();
    context.configure({
        device,
        format: "rgba8unorm",
        alphaMode: "opaque",
        usage: GPUTextureUsage.STORAGE_BINDING,
    });

    const module = device.createShaderModule({ code: sharder });
    const uniformBuffer = device.createBuffer({
        size: 9 * Float32Array.BYTES_PER_ELEMENT + 2 * Uint32Array.BYTES_PER_ELEMENT,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(uniformBuffer, 0 * Float32Array.BYTES_PER_ELEMENT, new Float32Array([props.realPart, props.imagPart, props.escapeRadius]));
    device.queue.writeBuffer(uniformBuffer, 3 * Float32Array.BYTES_PER_ELEMENT, new Uint32Array([props.maximumIterations]));
    device.queue.writeBuffer(
        uniformBuffer, 
        3 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT, 
        new Float32Array([props.zoom, props.radians, props.translationX, props.translationY, canvasElement.value.width, canvasElement.value.height])
    );
    device.queue.writeBuffer(uniformBuffer, 9 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT, new Uint32Array([palette.value.length]));

    const paletteBuffer = device.createBuffer({
        size: paletteEntries.value.length * 5 * Float32Array.BYTES_PER_ELEMENT,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(paletteBuffer, 0, new Float32Array(paletteEntries.value.flatMap(entry => [entry.value, ...entry.color])));

    const bindGroupLayout = device.createBindGroupLayout({
        label: "bindGroupLayout",
        entries: [
            {
                binding: 0,
                buffer: { type: "uniform" },
                visibility: GPUShaderStage.COMPUTE
            },
            {
                binding: 1,
                buffer: { type: "read-only-storage" },
                visibility: GPUShaderStage.COMPUTE
            },
            {
                binding: 2,
                visibility: GPUShaderStage.COMPUTE,
                storageTexture: { format: "rgba8unorm" }
            },
        ]
    });

    const texture = context.getCurrentTexture();
    const bindGroup = device.createBindGroup({
        label: "bindGroup",
        layout: bindGroupLayout,
        entries: [
            {
                binding: 0, 
                resource: { buffer: uniformBuffer },
            },
            {
                binding: 1, 
                resource: { buffer: paletteBuffer },
            },
            {
                binding: 2,
                resource: texture.createView({
                    dimension: "2d",
                }),
            },
        ],
    });

    const pipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout],
        }),
        compute: {
            module,
            entryPoint: "kernel",
        }
    });

    const encoder = device.createCommandEncoder({ label: "commandEncoder" });
    const computePass = encoder.beginComputePass();
    computePass.setPipeline(pipeline);
    computePass.setBindGroup(0, bindGroup);
    computePass.dispatchWorkgroups(Math.ceil(width / 8), Math.ceil(height / 8));
    computePass.end();

    const commandBuffer = encoder.finish();

    device.queue.submit([commandBuffer]);
}

let canvasObserver: ResizeObserver;
let animationFrameHandle: number;

onMounted(async () => {
    Arenas.instantiate();
    if (!canvasElement.value) return console.error("canvasElement.value should not be null");
    canvasObserver = new ResizeObserver(onCanvasResized);
    canvasObserver.observe(canvasElement.value);
    onCanvasResized();
    await initializeComputePipeline();
    animationFrameHandle = requestAnimationFrame(renderLoop);
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameHandle);
    Arenas.destroy();
});

function onCanvasResized() {
    if (!canvasElement.value) return console.error("canvasElement.value should not be null");
    const rect = canvasElement.value.getBoundingClientRect();
    canvasElement.value.width = rect.width;
    canvasElement.value.height = rect.height;
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

function computeJulia() {
	return true;
}

let previousTimestamp = 0;
async function renderLoop(timestamp: number) {
    const deltaTime = timestamp - previousTimestamp;
    previousTimestamp = timestamp;
    await update(deltaTime);
    await render(deltaTime);
    animationFrameHandle = requestAnimationFrame(renderLoop);
    updateFps(timestamp);
}

async function update(_: number) {
    if (computeJulia()) {
        const newStep = Math.max(step.value - 1, maximumDetailLevel.value);
        if (newStep !== step.value) emit("step", newStep);
    }
}

async function render(_: number) {
}

let previousFpsUpdateTimestamp = 0;
let frameCount = 0;
function updateFps(timestamp: number) {
    frameCount++;
    const elapsedTime = timestamp - previousFpsUpdateTimestamp;
    if (elapsedTime >= 1000) {
        const fps = Math.round(1000 / (elapsedTime / frameCount));
        if (fpsElement.value) fpsElement.value.textContent = `FPS: ${fps}`;
        frameCount = 0;
        previousFpsUpdateTimestamp = timestamp;
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
