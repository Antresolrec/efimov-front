import Cookies from 'js-cookie';

export default class CookieSite {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.showClass = '_show';

		this.container = selector;
		this.preloader = document.querySelector('.js-preloader');
		this.btnAccept = this.container.querySelector('.js-cookie-accept');
		this.name = this.container.hasAttribute('data-name') ? this.container.getAttribute('data-name') : 'cookie-site';
		this.daysExprires = this.container.hasAttribute('data-days-expires') ? Number(this.container.getAttribute('data-days-expires')) : 1;
		
		this.cookieEnabled = navigator.cookieEnabled;

		this.delayLoad = 300;
		this.delayShow = 1500;

		this.init();
	}

	bindMethods() {
		this.onBtnAcceptClick = this.onBtnAcceptClick.bind(this);
	}

	init() {
		this.bindMethods();
		this.checkInitCookie();
	}

	addListenerBtnAcceptClick() {
		this.btnAccept.addEventListener('click', this.onBtnAcceptClick);
	}

	onBtnAcceptClick(e) {
		e.preventDefault();

		this.container.classList.remove(this.showClass);
		Cookies.set(this.name, 'true', { expires: this.daysExprires });
	}

	checkInitCookie() {
		if (this.canShowCookie) {
			this.addListenerBtnAcceptClick();
			setTimeout(() => {
				if (this.preloader && this.preloader.style.display === '') {
					setTimeout(() => {
						this.container.classList.add(this.showClass);
					}, this.delayShow);
				} else {
					this.container.classList.add(this.showClass);
				}
			}, this.delayLoad);

		}
	}

	get canShowCookie() {
		return this.container && !Cookies.get(this.name) && this.cookieEnabled;
	}
}

export function initCookie() {
	const selector = document.querySelector('.js-cookie');
	new CookieSite(selector);
}
