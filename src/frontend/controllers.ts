class Tween {
    private startTimestamp: number;
    private duration: number;
    private initialValue: number;
    private targetValue: number;
    private easingFunction: (t: number) => number;
    private onCompleted?: () => void;

    constructor(
        initialValue: number,
        targetValue: number,
        duration: number,
        easingFunction: (t: number) => number = (t) => t,
        onCompleted?: () => void
    ) {
        this.startTimestamp = performance.now();
        this.duration = duration;
        this.initialValue = initialValue;
        this.targetValue = targetValue;
        this.easingFunction = easingFunction;
        this.onCompleted = onCompleted;
    }

    update(timestamp: number): number | null {
        const elapsed = timestamp - this.startTimestamp;
        const t = Math.min(elapsed / this.duration, 1);
        const easedT = this.easingFunction(t);
        const currentValue = this.initialValue + (this.targetValue - this.initialValue) * easedT;

        if (t === 1 && this.onCompleted) {
            this.onCompleted();
        }

        return t < 1 ? currentValue : null;
    }
}

export class TweenController {
    private activeTweens: Map<string, Tween> = new Map();

    addTween(
        key: string,
        initialValue: number,
        targetValue: number,
        duration: number,
        easingFunction?: (t: number) => number,
        onCompleted?: () => void
    ): void {
        this.activeTweens.set(
            key,
            new Tween(initialValue, targetValue, duration, easingFunction, onCompleted)
        );
    }

    update(timestamp: number): Map<string, number> {
        const values = new Map<string, number>();

        for (const [key, tween] of this.activeTweens.entries()) {
            const value = tween.update(timestamp);
            if (value !== null) {
                values.set(key, value);
            } else {
                this.activeTweens.delete(key);
            }
        }

        return values;
    }
}
