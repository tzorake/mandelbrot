export default class Arena<T> {
    private objects: T[];
    private capacity: number;
    private factoryMethod: () => T;
    private nextFreeIndex: number;

    constructor(factoryMethod: () => T, capacity: number) {
        this.factoryMethod = factoryMethod;
        this.capacity = capacity;
        this.objects = new Array(capacity);
        this.nextFreeIndex = 0;
        this.preallocate();
    }

    private preallocate() {
        for (let i = 0; i < this.capacity; i++) {
            this.objects[i] = this.factoryMethod();
        }
    }

    acquire(): T {
        if (this.nextFreeIndex < this.capacity) {
            return this.objects[this.nextFreeIndex++];
        }

        this.expand();
        
        return this.acquire();
    }

    releaseAll() {
        this.nextFreeIndex = 0;
    }

    reset() {
        this.nextFreeIndex = 0;
        this.objects = new Array(this.capacity);
        this.preallocate();
    }

    private expand() {
        const newCapacity = this.capacity * 2;
        const newObjects = new Array(newCapacity);

        for (let i = 0; i < this.capacity; i++) {
            newObjects[i] = this.objects[i];
        }

        for (let i = this.capacity; i < newCapacity; i++) {
            newObjects[i] = this.factoryMethod();
        }

        this.objects = newObjects;
        this.capacity = newCapacity;
    }
}