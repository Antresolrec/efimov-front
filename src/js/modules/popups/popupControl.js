import Popup from "./popup";

export default class Popups {
    constructor() {
        this.popups = [];

        this.init();
    }

    init() {
        const selectors = document.querySelectorAll('.js-popup');
        for (const el of selectors) {
            if (!el.popupControl) {
                const popupControl = new Popup(el, this);
                el.popupControl = popupControl;
                this.popups.push(popupControl);
            }
        }

    }

    openPopup(name) {
        const current = this.popups.filter((control) => control.name === name)[0];

        if (current) {
            current.open();
        }
    }
    closePopup(name) {
        const current = this.popups.filter((control) => control.name === name)[0];

        if (current) {
            current.close();
        }
    }

    closeAllPopups() {
        const current = this.popups.filter((control) => control.isOpen)[0];

        if (current) {
            current.close();
        }
    }

    getOpenedPopup() {
        const current = this.popups.filter((control) => control.isOpen)[0];

        return current;
    }
}