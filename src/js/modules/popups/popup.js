export default class Popup {
    constructor(selector, control) {
        if (!selector) {
            return;
        }

        this.class = {
            init: '_init',
            lock: '_lock',
            open: '_open-popup',
            notFirstOpen: '_not-first-open',
            close: '[data-close]',
        }

        this.data = {
            title: '',
            content: '',
            id: '',
        }

        this.container = selector;
        this.control = control;
        this.name = this.container.getAttribute('data-popup');
        this.triggers = this.getTriggers();
        this.body = this.container.querySelector('[data-body]');
        this.title = this.container.querySelector('[data-title]');
        this.content = this.container.querySelector('[data-content]');
        this.id = this.container.querySelector('[data-id]');
        this.video = this.container.querySelector('.js-video-popup');

        this.triggerWrapper = null;

        this.time = 300;

        this.notFirstOpen = false;
        this.inited = false;

        this.init();
    }

    init() {
        this.bindMethods();
        this.addListenerTriggerClick();

        this.container.classList.add(this.class.init);
        this.inited = true;

        this.checkOpenDefault();
    }

    bindMethods() {
        this.onDocClick = this.onDocClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTriggerClick = this.onTriggerClick.bind(this);
    }

    addListenerTriggerClick() {
        for (const el of this.triggers) {
            if (!el.hasListenerClick) {
                el.addEventListener('click', this.onTriggerClick);
                el.hasListenerClick = true;
            }
        }
    }

    addListenerDocCLick() {
        document.addEventListener('click', this.onDocClick);
    }

    removeListenerDocCLick() {
        document.removeEventListener('click', this.onDocClick);
    }

    addListenerKeyDown() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    removeListenerKeyDown() {
        document.removeEventListener('keydown', this.onKeyDown);
    }


    onTriggerClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.checkMovableContent(e);
        this.open();
    }

    onDocClick(e) {
        const { target } = e;

        if (target.closest(this.class.close)) {
            e.stopPropagation();
            this.body.style.transition = '';
            this.close();
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 27) {
            this.close();
        }
    }

    open() {
        if (!this.isOpen) {
            if (this.control) {
                this.control.closeAllPopups();
            }

            this.bodyLock();

            for (const trigger of this.triggers) {
                trigger.classList.add(this.class.open);
            }

            this.container.classList.add(this.class.open);

            if (!this.notFirstOpen) {
                this.notFirstOpen = true;
                this.container.classList.add(this.class.notFirstOpen);
            }

            if (this.video && this.video.readyState > 0) {
                this.video.play();
            }

            this.addListenerDocCLick();
            this.addListenerKeyDown();
        }
    }

    close() {
        if (this.isOpen) {
            const header = document.querySelector('.js-header');

            if (!header.classList.contains('_menu-open')) {
                setTimeout(() => {
                    this.bodyUnlock();
                }, this.time * 2);
            }

            for (const trigger of this.triggers) {
                trigger.classList.remove(this.class.open);
            }

            this.container.classList.remove(this.class.open);

            if (this.video && !this.video.paused) {
                this.video.pause();
            }

            this.removeListenerDocCLick();
            this.removeListenerKeyDown();
        }

    }

        /**
     * Проверяем, нужно ли передать контент в шторку извне
     */
    checkMovableContent(e) {
        const { target } = e;
        this.triggerWrapper = target.closest('[data-with-popup-content]');

        if (this.triggerWrapper) {
            const title = this.triggerWrapper.querySelector('[data-title]');
            const content = this.triggerWrapper.querySelector('[data-content]');
            const id = this.triggerWrapper.querySelector('[data-id]');

            if (title && this.title) {
                this.setPopupTitle(title.innerHTML);
            }

            if (content && this.content) {
                this.setPopupContent(content.innerHTML);
            }

            if (id && this.id) {
                this.setPopupId(id.innerHTML);
            }
        }
    }

    bodyLock() {
        window.bodyLock.lock();
    }

    bodyUnlock() {
        window.bodyLock.unlock();
    }

    /**
     * Устанавливаем извне заголовок 
     */
    setPopupTitle(html) {
        this.data.title = html;
        this.title.innerHTML = this.data.title;
    }

    /**
     * Устанавливаем извне контент(текст) 
     */
    setPopupContent(html) {
        this.data.content = html;
        this.content.innerHTML = this.data.content;
    }

    /**
     * Устанавливаем извне id 
     */
    setPopupId(value) {
        this.data.id = value;
        this.id.value = this.data.id;
    }

    getTriggers() {
        const selectors = document.querySelectorAll(`[data-popup-trigger="${this.name}"]`);
        return selectors;
    }


    checkOpenDefault() {
        if (this.container.hasAttribute('data-open-default')) {
            this.open();
        }
    }

    get isOpen() {
        return this.container.classList.contains(this.class.open);
    }
}