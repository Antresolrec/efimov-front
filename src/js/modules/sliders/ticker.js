import Swiper from 'swiper';

export default class TickerSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');
		this.prev = this.container.querySelector('.js-btn-prev');
        this.next = this.container.querySelector('.js-btn-next');

		this.ticker = this.container.querySelector('.js-ticker');
		this.tickerInstance = this.ticker.instanceTicker;
		this.slides = this.ticker.querySelectorAll('[data-item-ticker]');

		this.mediaQuery = window.matchMedia(`(max-width: 1023px)`);

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

	initSlider() {
		if (this.tickerInstance.isGo) {
			this.tickerInstance.destroy();
		}
		if (!this.swiperSlider) {
			this.ticker.classList.add('swiper-wrapper');
			for (const el of this.slides) {
				el.classList.add('swiper-slide');
			}
			this.swiperSlider = new Swiper(this.slider, this.options);
		}
	}

	destroySlider() {
		if (this.swiperSlider) {
			this.swiperSlider.destroy();
			this.ticker.classList.remove('swiper-wrapper');
			for (const el of this.slides) {
				el.classList.remove('swiper-slide');
			}
			this.swiperSlider = null;
		}
		this.tickerInstance.init();
	}
	
	onResize() {
        if (this.mediaQuery.matches) {
            this.initSlider();
        } else {
			this.destroySlider();
        }
    }


	get options() {
		return {
			speed: 500,
			slidesPerView: 'auto',
			loop: true,
		};
	}
}

export function initTickerSlider() {
	const selectors = document.querySelectorAll('.js-ticker-slider');

	for (const el of selectors) {
		new TickerSlider(el);
	}
}
