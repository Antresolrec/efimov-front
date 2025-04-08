import Swiper from 'swiper';

export default class AutoWidthSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');

		this.swiperSlider = null;

		this.init();
	}

	init() {
		this.initSlider();
	}

	initSlider() {
		this.swiperSlider = new Swiper(this.slider, this.options);
	}

	get options() {
		return {
			speed: 500,
			slidesPerView: 'auto',
		};
	}
}

export function initAutoWidthSlider() {
	const selectors = document.querySelectorAll('.js-auto-width-slider');

	for (const el of selectors) {
		new AutoWidthSlider(el);
	}
}
