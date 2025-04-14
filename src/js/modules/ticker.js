export default class Ticker {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.data = {
			go: '_go',
			name: {
				projects: 'js-ticker--projects',
			},
		}

		this.selector = selector;
		this.selector.instanceTicker = this;
		this.container = this.selector.closest('.js-tickers');
		this.items = this.selector.querySelectorAll('[data-item-ticker]');

		/**
		 * @see ticker.sass
		 */
		this.speed = +window.getComputedStyle(this.selector).animationDuration.replace('s','') || 40;

		this.clone = null;

		// this.init();
	}

	init() {
		this.checkItemsCount();
		this.checkReverse();
		this.makeClone();
		this.setSpeed();
		this.start();
	}

	start() {
		this.container.classList.add(this.data.go);
	}

	addItems() {
		for (const el of this.items) {
			const item = el.cloneNode(true);
			this.selector.appendChild(item);
		}
		this.items = this.selector.querySelectorAll('[data-item-ticker]');
	}

	makeClone() {
		this.clone = this.selector.cloneNode(true);
		this.container.appendChild(this.clone);
	}

	destroy() {
		this.clone.remove();
		this.clone = null;
		this.container.classList.remove(this.data.go);
	}

	checkItemsCount() {
		if (this.isTickerProjects) {
			if (this.items.length < 2) {
				this.addItems();
			} 
			if (this.items.length < 4) {
				this.addItems();
			} 
			if (this.items.length < 6) {
				this.addItems();
			}
		}
	}

	checkReverse() {
		if (this.selector.hasAttribute('data-reverse')) {
			this.container.style.flexDirection = 'row-reverse';
		}
	}

	setSpeed() {
		const speed = this.getSpeed();

		if (speed > this.speed) {
			const selectors = this.container.querySelectorAll('.js-ticker');

			for (const el of selectors) {
				el.style.animationDuration = speed + 's';
			}
		}
	}

	getSpeed() {
		const oneItem = this.speed / this.items.length;
		const oneItemSpeed = this.speed / oneItem;
		const speed = this.speed + oneItemSpeed * (this.items.length - 6);

		return +speed;
	}

	get isTickerProjects() {
		return this.selector.classList.contains(this.data.name.projects);
	}

	get isGo() {
		return this.container.classList.contains(this.data.go);
	}
}

export function initTicker() {
	const selectors = document.querySelectorAll('.js-ticker');

	for (const el of selectors) {
		new Ticker(el);
	}
}