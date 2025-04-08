import SlimSelect from 'slim-select';

export default class Select {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;
		this.container.instanceSelect = this;

		this.slimSelect = null;

		this.init();
	}

	create(selector) {
		this.slimSelect = new SlimSelect({
			select: selector,
			settings: {
				showSearch: false,
				openPosition: 'down',
				placeholderText: '',
			},
			events: {
				afterChange() {
					const field = selector.closest('.field');
					const selectedArr = selector.instanceSelect.slimSelect.getSelected();
					const customEvent = new Event('change', { bubbles: true });

					selector.dispatchEvent(customEvent);

					if (selectedArr.length > 0) {
						field.classList.add('_selected');
					} else {
						field.classList.remove('_selected');
					}
				},
			},
		});
	}

	init() {
		this.create(this.container);
	}
}

export function initSelects() {
	const selectors = document.querySelectorAll('.js-select');

	for (const el of selectors) {
		const instance = new Select(el);
	}
}