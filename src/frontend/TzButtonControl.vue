<script setup lang="ts">
import type { ButtonControl } from './types';
import TzIconLoader from './TzIconLoader.vue';

const props = defineProps<ButtonControl>();
const emit = defineEmits<{
    (e: "control:boolean", controlId: number, value: boolean): void,
}>();

function onClick() {
	emit("control:boolean", props.id, false);
}
</script>

<template>
<button class="button" @click="onClick">
	<div class="button__icon">
		<TzIconLoader v-if="props.icon != undefined" :icon="props.icon"></TzIconLoader>
	</div>
	<div class="button__text">{{ props.text }}</div>
</button>
</template>

<style scoped>
.button {
	min-width: 18px;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: #545454;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	box-sizing: border-box;
    font-family: var(--font-family);
    font-size: var(--group-font-size);
    color: var(--font-color);
	padding: 0px;
}

.button__icon {
	width: 14px;
	height: 14px;
}
</style>
