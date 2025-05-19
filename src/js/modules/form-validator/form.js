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

		this.btnSubmit = this.form.querySelector('[type="submit"]');

		this.errorText = this.form.querySelector('.js-form-error-text');

		this.noAddErrorFlag = true;

		this.fields = [];

		this.init();
	}

	init() {
		this.bindMethods();
		this.initFields();
		this.addListenerSubmitForm();

		if (this.btnSubmit.hasAttribute('need-validate')) {
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
			if (this.errorText) {
				this.errorText.closest('.form__error').style.display = '';
				this.errorText.innerHTML = '';
			}

			return;
		}
	}

	resetForm() {
		this.form.reset();

		const uploader = this.form.querySelector('.js-file-uploader');
		if (uploader) {
			window.FileUploader.clearList(uploader);
		}
		const selects = this.form.querySelectorAll('select.js-select');
		for (const el of selects) {
			el.instanceSelect.slimSelect.setSelected();
		}
		const phoneMasks = this.form.querySelectorAll('.js-mask-phone');
		for (const el of phoneMasks) {
			el.instanceMask.curMask.updateValue();
		}
		
	}

	setSendingState() {
		this.form.classList.remove(this.names.error);
		this.form.classList.add('_sending');
		this.btnSubmit.setAttribute('disabled', true);
		this.btnSubmit.classList.add('_sending');
	}

	setSuccesState() {
		this.form.classList.remove('_sending');
		this.btnSubmit.removeAttribute('disabled');
		this.btnSubmit.classList.remove('_sending');
		this.form.classList.add('_succes');
	}

	setErrorState(text, hideError) {
		this.form.classList.remove('_sending');
		this.btnSubmit.removeAttribute('disabled');
		this.btnSubmit.classList.remove('_sending');
		this.form.classList.add(this.names.error);
		if (this.errorText && text) {
			this.errorText.innerHTML = text;
		}
		if (this.errorText && hideError) {
			this.errorText.closest('.form__error').style.display = 'none';
		}
	}
}
