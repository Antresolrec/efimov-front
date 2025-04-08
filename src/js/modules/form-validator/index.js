import Form from "./form";

export function initForm() {
	const selectors = document.querySelectorAll('.js-form');

	for (const el of selectors) {
		if (!el.instanceForm) {
			const instance = new Form(el);
			el.instanceForm = instance;
		}
	}
}