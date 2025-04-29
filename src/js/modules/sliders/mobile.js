import Swiper from 'swiper';

export default class MobileSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');

		this.mediaQuery = window.matchMedia(`(max-width: 767px)`);

		this.swiperSlider = null;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListenerResize();
        this.onResize();
	}

	bindMethods() {
        this.onResize = this.onResize.bind(this);
    }

	addListenerResize() {
		this.mediaQuery.addEventListener('change', this.onResize);
    }

	onResize() {
        if (this.mediaQuery.matches) {
            this.initSlider();
        } else {
			this.destroySlider();
        }
    }


	initSlider() {
		this.swiperSlider = new Swiper(this.slider, this.options);
	}

	destroySlider() {
		if (this.swiperSlider) {
			this.swiperSlider.destroy();
			this.swiperSlider = null;
		}
	}

	get options() {
		return {
			speed: 500,
			slidesPerView: 'auto',
            navigation: {
                nextEl: this.next,
                prevEl: this.prev,
            },
		};
	}
}

export function initMobileSlider() {
	const selectors = document.querySelectorAll('.js-mobile-slider');

	for (const el of selectors) {
		new MobileSlider(el);
	}
}
