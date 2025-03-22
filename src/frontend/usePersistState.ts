import { ref, onMounted, onUnmounted } from 'vue';

function saveStateToLocalStorage(stateKey: string, state: any) {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function loadStateFromLocalStorage<T>(stateKey: string): T | null {
  const savedState = localStorage.getItem(stateKey);
  return savedState ? JSON.parse(savedState) : null;
}

export function usePersistState<T>(stateKey: string, initialState: T) {
    const state = ref<T>(loadStateFromLocalStorage<T>(stateKey) || initialState);

    const saveState = () => {
        saveStateToLocalStorage(stateKey, state.value);
    };

    const handleBeforeUnload = () => {
        console.info("handleBeforeUnload")
        saveState();
    };

    onMounted(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
    });

    onUnmounted(() => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    });

    return {
        state,
        saveState,
    };
}