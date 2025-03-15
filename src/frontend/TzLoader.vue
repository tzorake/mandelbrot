<script setup lang="ts">
import { computed } from 'vue';
import type { Control } from './SideBar.ts';
import TzButtonControl from './TzButtonControl.vue';
import TzCheckBoxControl from './TzCheckBoxControl.vue';
import TzComboBoxControl from './TzComboBoxControl.vue';
import TzNumberFieldControl from './TzNumberFieldControl.vue';

class UnknownControl extends Error {
    constructor() {
        super("Unknown control");
    }
}

const props = defineProps<Control>();
const emit = defineEmits<{
    (e: "control:value", controlId: number, value: number): void,
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

    throw new UnknownControl();
});

function onInput(controlId: number, value: number) {
    emit("control:value", controlId, value);
}
</script>

<template>
<component 
    class="control" 
    v-bind="props" 
    :is="item" 
    @control:value="onInput" 
/>
</template>

<style scoped>
.control {
    height: 18px;
}
</style>
