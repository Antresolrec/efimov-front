export default class Preloader {
	constructor(selector) {
		if (!selector) {
			return;
		}
		this.loader = selector;
		this.countCur = this.loader.querySelector('.js-preloader-count');
		this.countTotal = this.loader.querySelector('.js-preloader-count-total');

		this.fixedElements = document.querySelectorAll('.js-fixed-element');

		this.delayCheckLoad = 500;
		this.animTransition = 1000;

		this.init();
	}

	init() {
		this.hide();
	}

	hide() {
		setTimeout(() => {
			this.loader.classList.add('_hide');
			this.countCur.style.display = 'none';
			this.countTotal.style.display = '';
			setTimeout(() => {
				this.unlockBody();
			}, this.animTransition);
		}, this.delayCheckLoad);
	}

	unlockBody() {
		document.body.classList.remove('_lock-for-preloader');
		document.body.style.paddingRight = '';
		for (const el of this.fixedElements) {
			el.style.paddingRight = '';
		}
		this.loader.style.display = 'none';
	}
}

export function initPreloader() {
	const selector = document.querySelector('.js-preloader');
	new Preloader(selector);
}
