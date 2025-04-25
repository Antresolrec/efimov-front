export default class Switch {
    constructor(selector) {
        if (!selector) {
            return;
        }

        this.container = selector;
        this.inputAll = this.container.querySelector('[data-all]');
        this.inputs = this.container.querySelectorAll('.js-switch-input');
        this.inputsNotAll = [...this.inputs].filter(el => !el.hasAttribute('data-all'));

        this.init();
    }

    init() {
        this.bindMethods();
        this.addListenerChange();
    }

    bindMethods() {
        this.changeHandler = this.changeHandler.bind(this);
    }

    addListenerChange() {
        for (const el of this.inputs) {
            el.addEventListener('change', this.changeHandler);
        }
    }

    changeHandler(e) {
        const { target } = e;

        this.onChange(target);
    }

    onChange(target) {
        if (target.hasAttribute('data-all')) {
            if (target.checked) {
                for (const el of this.inputsNotAll) {
                    el.checked = false;
                }
            }
        } else if (target.checked && this.inputAll){
            this.inputAll.checked = false;
        }
    }
}

export function initSwitch() {
    const selectors = document.querySelectorAll('.js-switch');

    for (const el of selectors) {
        new Switch(el);
    }
}