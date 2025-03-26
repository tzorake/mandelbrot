import { ref, onMounted, onUnmounted } from 'vue';

function saveStateToLocalStorage(stateKey: string, state: any) {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function loadStateFromLocalStorage<T>(stateKey: string): T | null {
  const savedState = localStorage.getItem(stateKey);
  return savedState ? JSON.parse(savedState) : null;
}

export function usePersistState<T>(stateKey: string, initialState: T, enabled: boolean = true) {
    const state = ref<T>(enabled ? (loadStateFromLocalStorage<T>(stateKey) || initialState) : initialState);

    const saveState = () => {
        if (enabled) {
            saveStateToLocalStorage(stateKey, state.value);
        }
    };

    const handleBeforeUnload = () => {
        if (enabled) {
            console.info("handleBeforeUnload");
            saveState();
        }
    };

    if (enabled) {
        onMounted(() => {
            window.addEventListener('beforeunload', handleBeforeUnload);
        });

        onUnmounted(() => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        });
    }

    return {
        state,
        saveState,
    };
}