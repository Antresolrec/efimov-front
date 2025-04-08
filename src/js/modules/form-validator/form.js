import Field from './fields';

export default class Form {
	constructor(form) {
		if (!form) {
			return;
		}

		this.names = {
			error: '_error',
		};

		this.form = form;

		this.fieldsSelectors = this.form.querySelectorAll('input[data-required], textarea[data-required], select[data-required], [data-required="radio"]');

		this.btnSubmit = this.form.querySelector('.js-btn-submit');

		this.noAddErrorFlag = true;

		this.fields = [];

		this.init();
	}

	init() {
		this.bindMethods();
		this.initFields();
		this.addListenerSubmitForm();

		if (this.btnSubmit) {
			this.validateSubmitButton();
			this.addListenerChangeForm();
		}
	}

	bindMethods() {
		this.submitHandler = this.submitHandler.bind(this);
		this.chagneHandler = this.chagneHandler.bind(this);
	}

	addListenerSubmitForm() {
		this.form.addEventListener('submit', this.submitHandler);
	}

	addListenerChangeForm() {
		this.form.addEventListener('change', this.chagneHandler);
	}

	submitHandler(e) {
		this.onSubmit(e);
	}

	chagneHandler(e) {
		this.validateSubmitButton();
	}

	initFields() {
		this.fieldsSelectors.forEach((el) =>
			this.fields.push(new Field(el, this.form))
		);
	}

	validationForm(withoutError) {
		return this.fields.reduce((acc, field) => {
			const result = field.validation(withoutError);
			return acc ? result : false;
		}, true);
	}

	validateSubmitButton() {
		if (this.validationForm(this.noAddErrorFlag)) {
			this.btnSubmit.removeAttribute('disabled', true);
		} else {
			this.btnSubmit.setAttribute('disabled', true);
		}
	}

	onSubmit(e) {
		if (!this.validationForm()) {
			e.preventDefault();

			this.form.classList.add(this.names.error);

			return;
		}
	}
}
