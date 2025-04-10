import anime from "animejs";

export default class Counter {
    constructor(selector) {
        if (!selector) {
            return;
        }

        this.data = {
            go: '_go',
        }

        this.selector = selector;

        this.el = null;
    }

    startAnimation() {
        this.selector.classList.add(this.data.go);

        this.el = anime(this.options);
    }

    get options() {
        return {
            targets: this.selector,
            innerHTML: [this.startFrom , this.selector.innerHTML],
            duration: this.duration,
            round: 1,
            easing: 'linear',
        }
    }

    get duration() {
        return this.selector.dataset.duration || 3000;
    }

    get startFrom() {
        return this.selector.dataset.start || 0;
    }
}

export function initCounter() {
    const selectors = document.querySelectorAll('.js-counter');

    for (const el of selectors) {
        const instance = new Counter(el);
        instance.startAnimation();
    }
}