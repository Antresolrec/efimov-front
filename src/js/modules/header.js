export default class Header {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.data = {
			menuOpen: '_menu-open',
		};

		this.header = selector;
		this.triggerMenu = this.header.querySelector('.js-trigger-menu');

		this.media = window.matchMedia(`(max-width: ${this.triggerMenu.dataset.showOn}px)`);

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListeners();
		this.onResize();
	}

	bindMethods() {
		this.clickHandler = this.clickHandler.bind(this);
		this.resizeHandler = this.resizeHandler.bind(this);
		this.scrollHanlder = this.scrollHanlder.bind(this);
	}

	addListeners() {
		this.addListenerTriggerClick();
		this.addListenerResize();
	}

	addListenerTriggerClick() {
		this.triggerMenu.addEventListener('click', this.clickHandler);
	}

	addListenerResize() {
		this.media.addEventListener('change', this.resizeHandler);
	}

	addListenerScroll() {
		document.addEventListener('scroll', this.scrollHanlder);
	}

	removeListenerScroll() {
		document.removeEventListener('scroll', this.scrollHanlder);
	}

	clickHandler(e) {
		e.preventDefault();

		this.onTriggerClick();
	}

	resizeHandler(e) {
		this.onResize(e);
	}

	scrollHanlder(e) {
		this.onScroll();
	}

	onTriggerClick() {
		this.header.classList.toggle(this.data.menuOpen);

		if (this.isOpen) {
			window.bodyLock.lock();
		} else {
			window.bodyLock.unlock();
		}
	}

	onResize(e) {
		if (this.media.matches) {
			this.removeListenerScroll();
		} else {
			this.addListenerScroll();
			this.header.classList.remove(this.data.menuOpen);
			bodyLock.unlock();
		}
	}

	onScroll() {
		if (window.scrollY > 0) {
			this.header.classList.add('_scroll');
		} else {
			this.header.classList.remove('_scroll');
		}
	}

	get isOpen() {
		return this.header.classList.contains(this.data.menuOpen);
	}
}

export function initHeader() {
	const selector = document.querySelector('.js-header');
	new Header(selector);
}
