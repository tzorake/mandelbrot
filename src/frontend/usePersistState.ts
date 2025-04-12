import { ref, onMounted, onUnmounted, type Ref } from 'vue';

function saveStateToLocalStorage<T>(stateKey: string, state: Ref<T>) {
  localStorage.setItem(stateKey, JSON.stringify(state.value));
}

function loadStateFromLocalStorage<T>(stateKey: string): T | null {
  const savedState = localStorage.getItem(stateKey);
  return savedState ? JSON.parse(savedState) : null;
}

export function usePersistState<T>(stateKey: string, initialState: Ref<T>, enabled: boolean = true) {
    const createState = () => {
        if (enabled) {
            const loadedState = loadStateFromLocalStorage<T>(stateKey);
            return loadedState ? ref<T>(loadedState) : initialState;
        } else {
            return initialState;
        }
    }

    const state = createState();

    const saveState = () => {
        if (enabled) {
            saveStateToLocalStorage(stateKey, state);
        }
    };

    const handleBeforeUnload = () => {
        if (enabled) {
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