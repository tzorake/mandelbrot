<script setup lang="ts">
import type { ButtonControl } from './SideBar';


const props = defineProps<ButtonControl>();

function onClick() {
}
</script>

<template>
<button class="button" @click="onClick">
	<div class="button__icon">
		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
		</svg>
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
}

.button__icon {
	width: 14px;
	height: 14px;
}
</style>
