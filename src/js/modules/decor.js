export default class Decor {
    constructor() {
        this.selectors = document.querySelectorAll('.js-decor');

        this.init();
    }

    init() {
        for (const el of this.selectors) {
            this.create(el);
        }
    }

    create(selector) {
        const arr = selector.textContent.split('');
        selector.innerHTML = '';

        for (let index = 0; index < arr.length; index++) {
            const el = arr[index];
            const span = document.createElement('SPAN');
            span.innerHTML = el;
            selector.append(span);
        }
    }

}

export function initDecor() {
    new Decor();
}