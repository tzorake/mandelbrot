import { ref, onMounted, onUnmounted, type ShallowRef } from "vue";

export default function useClickOutside(element: Readonly<ShallowRef<Element | null>>) {
  const state = ref(false);

  const handleClickOutside = (event: Event) => {
    if (element.value && !element.value.contains(event.target as Element | null)) {
        state.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return { state };
}