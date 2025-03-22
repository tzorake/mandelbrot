<script setup lang="ts">
import { computed } from 'vue';
import type { Control } from './SideBar.ts';
import TzButtonControl from './TzButtonControl.vue';
import TzCheckBoxControl from './TzCheckBoxControl.vue';
import TzComboBoxControl from './TzComboBoxControl.vue';
import TzNumberFieldControl from './TzNumberFieldControl.vue';

const props = defineProps<Control>();
const emit = defineEmits<{
    (e: "control:value", controlId: number, value: number | boolean): void,
}>();

const item = computed(() => {
    switch (props.type) {
        case "NumberField": {
            return TzNumberFieldControl;
        } break;

        case "ComboBox": {
            return TzComboBoxControl;
        } break;

        case "CheckBox": {
            return TzCheckBoxControl;
        } break;

        case "Button": {
            return TzButtonControl;
        } break;
    }
});

function onInput(controlId: number, value: number) {
    emit("control:value", controlId, value);
}
</script>

<template>
<component 
    v-if="item"
    v-bind="props" 
    class="control" 
    :is="item" 
    @control:value="onInput" 
/>
<div 
    v-else 
    class="error"
>
    Unsupported control type: {{ props.type }}
</div>
</template>

<style scoped>
.control {
    height: 18px;
}
</style>
