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
		this.container = this.selector.closest('.js-tickers');
		this.items = this.selector.querySelectorAll('[data-item-ticker]');

		this.init();
	}

	init() {
		this.checkItemsCount();
		this.checkReverse();
		this.makeClone();
		this.start();
	}

	checkItemsCount() {
		if (this.isTickerProjects) {
			console.log(this.items.length);
			if (this.items.length < 4) {
				this.addItems();
			} 
			if (this.items.length < 6) {
				this.addItems();
			}
		}
	}
	
	addItems() {
		for (const el of this.items) {
			const item = el.cloneNode(true);
			this.selector.appendChild(item);
		}
		this.items = this.selector.querySelectorAll('[data-item-ticker]');
		console.log(this.items.length);
	}

	checkReverse() {
		if (this.selector.hasAttribute('data-reverse')) {
			this.container.style.flexDirection = 'row-reverse';
		}
	}

	makeClone() {
		const clone = this.selector.cloneNode(true);
		this.container.appendChild(clone);
	}

	start() {
		if (this.container.hasAttribute('data-delay')) {
			setTimeout(() => {
				this.container.classList.add(this.data.go);
			}, this.container.dataset.delay);
		} else {
			this.container.classList.add(this.data.go);
		}
	}

	get isTickerProjects() {
		return this.selector.classList.contains(this.data.name.projects);
	}
}

export function initTicker() {
	const selectors = document.querySelectorAll('.js-ticker');

	for (const el of selectors) {
		new Ticker(el);
	}
}