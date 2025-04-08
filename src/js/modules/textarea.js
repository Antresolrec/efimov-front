export default class CountTextarea {
    constructor() {
        this.selectors = document.querySelectorAll(".js-textarea");

        this.init();
    }

    static setHeight(el) {
        el.style.height = '';
        el.style.height = el.scrollHeight + 2 +'px';
    }

    static setCounter(el) {
        if (el.counter) {
            el.counter.innerHTML = `${el.value.length}/${el.maxLength}`
        }
    }

    onInput() {
        const el = this;
        CountTextarea.setHeight(el);
        CountTextarea.setCounter(el);
    }

    init() {
        for (const el of this.selectors) {
            el.counter = el.parentNode.querySelector('.js-count-textarea');
            CountTextarea.setCounter(el.counter);

            el.addEventListener('input', this.onInput, false);
        }
    }
}

export function initCountTextareas() {
    new CountTextarea();
}