export default class BodyLock {
	constructor() {
		this.data = {
			lock: '_lock',
		};

		this.body = document.body;

		this.lockFlag = false;
		this.selectors = null;
	}

	init() {
		this.selectors = document.querySelectorAll('.js-fixed-element');
	}

	switchFlag() {
		this.lockFlag = !this.lockFlag;
	}

	lock() {
		if (!this.lockFlag) {
			this.switchFlag();
			this.checkFlag(true);
			this.body.classList.add(this.data.lock);
		}
	}

	unlock() {
		if (this.lockFlag) {
			this.switchFlag();
			this.checkFlag(false);
			this.body.classList.remove(this.data.lock);
		}
	}

	checkFlag(flag) {
		if (flag) {
			this.setPadding(`${this.scrollbarSize}px`);
		} else {
			this.setPadding('');
		}
	}

	setPadding(property) {
		this.body.style.paddingRight = property;

		for (const el of this.selectors) {
			el.style.paddingRight = property;
		}
	}

	get scrollbarSize() {
		return window.innerWidth - this.body.offsetWidth;
	}
}

export function initBodyLock() {
	const bodyLock = new BodyLock();
	bodyLock.init();
	window.bodyLock = bodyLock;
}
