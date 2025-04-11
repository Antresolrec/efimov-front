import anime from "animejs";

export default class Counter {
    constructor() {
        this.selectors = document.querySelectorAll('.js-counter');

        this.data = {
            go: '_go',
        }

        this.offsetTop = -50;

        if (this.selectors.length > 0) {
            this.init();
        }

    }

    init() {
        this.bindMethods();
        this.addListenerScroll();
        this.onScroll();
    }
    
    bindMethods() {
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    addListenerScroll() {
        document.addEventListener('scroll', this.scrollHandler)
    }

    scrollHandler(e) {
        this.onScroll();
    }

    onScroll() {
        for (const el of this.selectors) {
            if (!el.classList.contains(this.data.go)) {
                if (Counter.isStartImmediately(el)) {
                    this.startAnimation(el);
                }
                else if (this.canStart(el)) {
                    this.startAnimation(el);
                }
            }
        }
    }

    startAnimation(el) {
        el.classList.add(this.data.go);
        
        const options = Counter.getOptions(el);
        anime(options);
    }

    canStart(el) {
        return this.getPos(el).bottom - window.innerHeight < 0;
    }

    getPos(el) {
        const { top, bottom } = el.getBoundingClientRect();
        const pointTop = top - this.offsetTop;
        const pointBottom = bottom - this.offsetTop;

        return {
            top: pointTop,
            bottom: pointBottom,
        };
    }

    static isStartImmediately(el) {
        return el.dataset.startImmediately;
    }


    static getOptions(el) {
        const startFrom = Counter.getStartFrom(el);
        const duration = Counter.getDuration(el);

        return {
            targets: el,
            innerHTML: [startFrom , el.innerHTML],
            duration: duration,
            round: 1,
            easing: 'linear',
        }
    }

    static getDuration(el) {
        return el.dataset.duration || 3000;
    }

    static getStartFrom(el) {
        return el.dataset.start || 0;
    }
}

export function initCounter() {
    new Counter();
}