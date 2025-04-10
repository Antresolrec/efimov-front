import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default class AutoWidthSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');
		this.prev = this.container.querySelector('.js-btn-prev');
        this.next = this.container.querySelector('.js-btn-next');

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
			modules: [Navigation],
			speed: 500,
			slidesPerView: 'auto',
            navigation: {
                nextEl: this.next,
                prevEl: this.prev,
            },
		};
	}
}

export function initAutoWidthSlider() {
	const selectors = document.querySelectorAll('.js-auto-width-slider');

	for (const el of selectors) {
		new AutoWidthSlider(el);
	}
}
