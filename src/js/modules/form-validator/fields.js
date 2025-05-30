class Field {
	constructor(field, form) {
		if (!field) {
			return;
		}

		this.names = {
			error: '_error',
		};

		this.field = field;
		this.field.instanceField = this;
		this.form = form;

		this.container = this.field.closest('.js-input');
		this.radios = this.field.querySelectorAll('input[type="radio"]');

		this.interaction = this.checkInteraction();
		this.patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		this.isFilled = false;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addEventListeners();
	}

	bindMethods() {
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	addEventListeners() {
		this.field.addEventListener('change', this.onChange);
		if (this.field.dataset.required !== 'file') {
			this.field.addEventListener('focus', this.onFocus);
			this.field.addEventListener('blur', this.onBlur);
		}
	}

	onChange(e) {
		this.validation();
		this.removeError();
		this.interaction = true;
	}

	onFocus(e) {
		this.removeError();
	}

	onBlur(e) {
		this.validation();
		this.interaction = true;
	}

	validation(withoutError) {
		if (!this.fieldlDisabled && this.fieldRequired) {
			switch (this.field.getAttribute('data-required')) {
				case 'text':
					if (this.field.value.trim() !== '') {
						this.removeError();
						return true;
					}
					break;
				case 'checkbox':
					if (this.field.checked) {
						this.removeError();
						return true;
					}
					break;
				case 'tel':
					if (
						this.field.value !== '' &&
						// this.field.value.indexOf('_') === -1 &&
						this.field.value[this.field.value.length - 1] !== ' ' &&
						!this.container.classList.contains(this.names.error)
					) {
						this.removeError();
						return true;
					}
					break;
				case 'tel-mask':
						if (
							// this.field.instanceMask.curMask.unmaskedValue === '' ||
							this.field.value !== '' &&
							(this.field.value[this.field.value.length - 1] !== ' ' &&
							!this.container.classList.contains(this.names.error))
						) {
							this.removeError();
							return true;
						}
						break;
				case 'email':
					if (this.field.value.toLowerCase().search(this.patternEmail) === 0) {
						this.removeError();
						return true;
					}
					break;
				case 'select':
					const options = this.field.querySelectorAll(
						'option:not([data-placeholder])'
					);
					for (let index = 0; index < options.length; index += 1) {
						const el = options[index];
						if (el.selected) {
							this.removeError();
							return true;
						}
					}
					break;
				case 'file':
					// if (this.field.value || this.field.filesArray.length > 0) {
					if (!this.container.classList.contains(this.names.error)) {
						this.removeError();
						return true;
					}
					break;
				case 'checkbox':
					if (this.field.checked) {
						this.removeError();
						return true;
					}
					break;
				case 'radio': {
					if (this.isRadioChecked()) {
						this.removeError();
						return true;
					}
					break;
				}
				default:
					return true;
			}
			if (!withoutError) {
				this.addError();
			}
			this.isFilled = false;
			return false;
		}
		return true;
	}

	addError() {
		this.container.classList.add(this.names.error);
	}

	removeError() {
		this.container.classList.remove(this.names.error);
		this.isFilled = true;
	}

	checkInteraction() {
		return this.container.hasAttribute('data-no-interaction');
	}

	isRadioChecked() {
		return Array.from(this.radios).reduce((acc, radio) => {
			if (radio.checked) {
				return true;
			}
			return acc;
		}, false);
	}

	get fieldlDisabled() {
		return this.field.hasAttribute('disabled');
	}

	get fieldRequired() {
		return this.field.hasAttribute('data-required');
	}
}

export default Field;
