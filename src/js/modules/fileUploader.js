export default class FileUploader {
	constructor() {
		const selectors = document.querySelectorAll('.js-file-uploader');

		for (const el of selectors) {
			if (!el.hasAttribute('data-inited')) {
				el.setAttribute('data-inited', true);
				this.init(el);
			}
		}
	}

	/**
	 * Выводим ошибку
	 */
	static addError(input) {
		setTimeout(() => {
			input.instanceField.addError();
		}, 100);
	}
	/**
	 * Очищаем список из разметки из файлы, прокидывая селектор инпута
	 * @param {HTMLInputElement} input инпут
	 */
	static clearList(input) {
		const container = input.closest('.js-file-uploader');
		const filesContainer = container.querySelector('.uploader__files');
		filesContainer.innerHTML = '';
		input.value = '';
		input.filesArray = [];
		input.setAttribute('data-size', '0');
		if (input.instanceField) {
			input.instanceField.interaction = true;
		}
	}

	/**
	 * Рендерим список файлов в разметку, прокидывая селектор инпута
	 * @param {HTMLInputElement} input инпут
	 */
	renderFilesList(input) {
		const container = input.closest('.js-file-uploader');
		const filesContainer = container.querySelector('.uploader__files');
		filesContainer.innerHTML = '';
		

		for (let i = 0, len = input.filesArray.length; i < len; i++) {
			filesContainer.append(this.renderFile(input.filesArray[i], i, input));
		}

		if (input.filesArray.length > 0) {
			container.classList.add('_loaded');
		} else {
			container.classList.remove('_loaded');
		}
	}

	/**
	 * Формитируем байты в нужный формат
	 * @param {Number} bytes вес в байтах
	 * @param {Number} decimals десятичные дроби
	 * @returns {String} строка в примерном виде '5 МБ'
	 */
	formatBytes(bytes, decimals = 2) {
		if (bytes === 0) {
			return '0';
		} else {
			let k = 1024;
			let dm = decimals < 0 ? 0 : decimals;
			let sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
			let i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		}
	}

	/**
	 * Рендер одного файла в разметку
	 * @param {Object} file объект файла
	 * @param {Number} index индекс файла
	 * @param {HTMLInputElement} input инпут
	 * @returns 
	 */
	renderFile(file, index, input) {
		const container = document.createElement('div');
		container.classList.add('uploader__file');

		const fileIco = document.createElement('div');
		fileIco.classList.add('uploader__file-ico', 'ico', 'ico-20');
		fileIco.innerHTML = `
		<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9173 1.43823C10.6354 1.4166 10.3225 1.41662 9.8647 1.41664L9.81582 1.41664L9.696 1.41663C8.43281 1.41649 7.66282 1.4164 7.00768 1.57171C4.89225 2.07319 3.24055 3.72489 2.73907 5.84031C2.58376 6.49546 2.58385 7.26545 2.584 8.52864L2.58401 8.64846V12.1666L2.584 12.3014C2.58381 13.7226 2.58369 14.5891 2.77993 15.3215C3.31162 17.3058 4.86152 18.8557 6.8458 19.3874C7.57817 19.5836 8.44474 19.5835 9.86586 19.5833L10.0007 19.5833L10.1355 19.5833C11.5566 19.5835 12.4232 19.5836 13.1556 19.3874C15.1398 18.8557 16.6897 17.3058 17.2214 15.3215C17.4177 14.5891 17.4175 13.7226 17.4174 12.3014L17.4173 12.1666V9.27959L17.4173 9.20988C17.4174 8.66673 17.4174 8.26647 17.3921 7.91664H15.6673L15.6153 7.91665C14.7169 7.91667 13.9676 7.9167 13.3729 7.83673C12.7451 7.75233 12.1783 7.56666 11.7228 7.11119C11.2673 6.65572 11.0817 6.08892 10.9973 5.46112C10.9173 4.86634 10.9173 4.11712 10.9173 3.21865L10.9173 3.16665V1.43823ZM17.0628 6.41664C16.8866 5.93817 16.6469 5.48377 16.349 5.06601C16.071 4.67612 15.7254 4.33057 15.1636 3.76894L15.1143 3.71965L14.9295 3.53479L14.8949 3.50023C14.5012 3.10641 14.259 2.8642 13.9958 2.65616C13.5174 2.27792 12.9843 1.98001 12.4173 1.77114V3.16665C12.4173 4.13066 12.4189 4.77822 12.4839 5.26125C12.5459 5.72271 12.6531 5.92021 12.7835 6.05053C12.9138 6.18084 13.1113 6.28807 13.5727 6.35011C14.0558 6.41505 14.7033 6.41664 15.6673 6.41664H17.0628ZM13.031 9.96966C13.3239 10.2626 13.3239 10.7374 13.031 11.0303L9.69767 14.3637C9.40478 14.6565 8.9299 14.6565 8.63701 14.3637L7.38701 13.1137C7.09412 12.8208 7.09412 12.3459 7.38701 12.053C7.6799 11.7601 8.15478 11.7601 8.44767 12.053L9.16734 12.7727L11.9703 9.96966C12.2632 9.67676 12.7381 9.67676 13.031 9.96966Z" fill="#19743C"/>
		</svg>
		`;

		const fileName = document.createElement('div');
		fileName.classList.add('uploader__file-name');
		fileName.innerHTML = file.name;

		const fileSize = document.createElement('div');
		fileSize.classList.add('uploader__file-size');
		fileSize.innerHTML = this.formatBytes(file.size);

		const deleteIcon = document.createElement('button');
		deleteIcon.type = 'button';
		deleteIcon.classList.add('uploader__file-delete', 'ico', 'ico-20');
		deleteIcon.innerHTML = `
		<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M3.46967 3.96967C3.76256 3.67678 4.23744 3.67678 4.53033 3.96967L8 7.43934L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967C12.8232 4.26256 12.8232 4.73744 12.5303 5.03033L9.06066 8.5L12.5303 11.9697C12.8232 12.2626 12.8232 12.7374 12.5303 13.0303C12.2374 13.3232 11.7626 13.3232 11.4697 13.0303L8 9.56066L4.53033 13.0303C4.23744 13.3232 3.76256 13.3232 3.46967 13.0303C3.17678 12.7374 3.17678 12.2626 3.46967 11.9697L6.93934 8.5L3.46967 5.03033C3.17678 4.73744 3.17678 4.26256 3.46967 3.96967Z" fill="#0A0A0A"/>
		</svg>
		`;

		container.append(fileIco);
		container.append(fileName);
		container.append(fileSize);
		container.append(deleteIcon);

		deleteIcon.addEventListener('click', (e) => {

			e.preventDefault();
			e.stopPropagation();

			const form = deleteIcon.closest('.js-form');

			let sizeInMB = Number(input.getAttribute('data-size'))

			for (let i = 0; i < input.filesArray.length; i++) {
				if (index === i){
					sizeInMB -= parseFloat((input.filesArray[i].size / (1024 * 1024)).toFixed(2));
					if (sizeInMB < 0) {
						sizeInMB = 0;
					}
					input.filesArray.splice(i,1);
					input.setAttribute('data-size', sizeInMB)
				}
			}

			input.value = '';

			this.renderFilesList(input);

			const event = new Event('fileDeleted', {bubbles:true});
			document.dispatchEvent(event);

			const eventChangeForm = new Event('change', {bubbles:true});
			form.dispatchEvent(eventChangeForm);
		});

		return container;
	}

	/**
	 * Инитим. Добавляем слушатель change на инпут.
	 * @param {HTMLElement} el контейнер
	 */
	init(el) {
		const container = el;
		const input = container.querySelector('.uploader__input');
		const errorText = container.querySelector('.js-file-uploader-error');
		const maxCount = Number(input.getAttribute('data-max-count'));
		const maxSizeMb = Number(input.getAttribute('data-max-size-mb'));
		const extensions = ['jpg', 'jpeg', 'png','pdf','tif','gif'];
		if (!input.filesArray) {
			input.filesArray = [];
		}

		let errorSize = false;
		let errorCount = false;
		let errorExtension = false;
		let notExtensionFiles = [];
		let notSizeFiles = [];
		let sizeInMB = Number(input.getAttribute('data-size'))
		let notSizeFilesMb = 0;

		input.addEventListener('change', (e) => {
			errorSize = false;
			errorCount = false;
			errorExtension = false;
			errorText.innerHTML = '';
			notExtensionFiles = [];
			notSizeFiles = [];
			notSizeFilesMb = 0;
			sizeInMB = Number(input.getAttribute('data-size'))
			

			// Проверка на кол-во файлов для вывода ошибки
			if (input.files.length > maxCount && !errorCount) {
				errorCount = true;
				errorText.innerHTML += `<p>Вы можете прикрепить до ${maxCount} файлов</p>`;
				FileUploader.addError(input);
			}
			const filesArray = Array.from(input.files).slice(0, maxCount);
			const dt = new DataTransfer();

			for (let i = 0; i < filesArray.length; i++) {
				const file = filesArray[i];
				if (input.filesArray.length < maxCount) {
					sizeInMB += parseFloat((file.size / (1024 * 1024)).toFixed(2));
				}
				const acceptSize = sizeInMB <= maxSizeMb;
				const extension = file.name.slice(file.name.lastIndexOf('.') + 1)
				const acceptExtension = extensions.includes(extension.toLowerCase());

				// Проверка на размер файлов
				if (!acceptSize && !errorSize) {
					errorSize = true;
					notSizeFiles.push(` ${file.name}`);
					if (input.filesArray.length < maxCount) {
						notSizeFilesMb += parseFloat((file.size / (1024 * 1024)).toFixed(2));
					}
				}

				// Проверка на расширение
				if (!acceptExtension && !errorExtension) {
					errorExtension = true;
					notExtensionFiles.push(` ${file.name}`);
				}

				if (!errorSize && !errorExtension) {
					dt.items.add(file);
				}
				errorSize = false;
				errorExtension = false;

			}
			if (notExtensionFiles.length > 0) {
				let text = notExtensionFiles.length === 1 ? 'файла' : 'файлов';
				errorText.innerHTML += `<p>Неверный формат ${text}: ${notExtensionFiles}</p>`;
				FileUploader.addError(input);
			}
			if (notSizeFiles.length > 0) {
				errorText.innerHTML += '<p>Превышен общий размер файлов</p>';
				FileUploader.addError(input);
				sizeInMB -= notSizeFilesMb;
			}

			// Повторная проверка на кол-во файлов для рендера списка
			for (const file of dt.files) {
				if (input.filesArray.length >= maxCount) {
					if (!errorCount) {
						errorCount = true;
						errorText.innerHTML += `<p>Вы можете прикрепить до ${maxCount} файлов</p>`;
					}
					FileUploader.addError(input);
					break;
				}
				input.filesArray.push(file);
			}
			input.setAttribute('data-size', sizeInMB)
			this.renderFilesList(input);

			input.value = '';
		});
	}
}

export function initFileUploader() {
	new FileUploader();
}
window.FileUploader = FileUploader;
window.initFileUploader = initFileUploader;