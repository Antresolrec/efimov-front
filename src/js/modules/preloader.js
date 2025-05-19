export default class Preloader {
	constructor(selector) {
		if (!selector) {
			return;
		}
		this.loader = selector;
		this.countCur = this.loader.querySelector('.js-preloader-count');
		this.countTotal = this.loader.querySelector('.js-preloader-count-total');

		this.header = document.querySelector('.js-header');

		this.delayCheckLoad = 500;
		this.animTransition = 1000;

		this.init();
	}

	init() {
		this.onInit();
	}

	onInit() {
		this.hideLoaderStatic();
	}

	hideLoader() {
		this.loader.classList.add('_hide');
		this.countCur.style.display = 'none';
		this.countTotal.style.display = '';
	}

	hideLoaderStatic() {
		setTimeout(() => {
			this.hideLoader();
			setTimeout(() => {
				this.unlockBody();
			}, this.animTransition);
		}, this.delayCheckLoad);
	}

	unlockBody() {
		document.body.classList.remove('_lock-for-preloader');
		document.body.style.paddingRight = '';
		this.header.style.paddingRight = '';
		this.loader.style.display = 'none';
	}
}

export function initPreloader() {
	const selector = document.querySelector('.js-preloader');
	new Preloader(selector);
}
