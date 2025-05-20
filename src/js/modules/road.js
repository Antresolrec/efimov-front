export default class Road {
    constructor() {
        this.names = {
            active: '_active',
        }

        this.offsetTop = -50;

        this.selectors = document.querySelectorAll('.js-road-item');

        if (this.selectors.length > 0) {
            this.init();
        }
    }

    init() {
        this.bindMethods();
        this.addListenerScroll();
    }

    bindMethods() {
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    addListenerScroll() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    scrollHandler(e) {
        this.onScroll(e);
    }

    onScroll(e) {
        for (const el of this.selectors) {
            if (this.isVisible(el) && !el.classList.contains(this.names.active)) {
                el.classList.add(this.names.active);
            }
        }
    }

    isVisible(el) {
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
}

export function initRoad() {
    new Road();
}