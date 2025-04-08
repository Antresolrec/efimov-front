import '../scss/app.scss';

import { initBodyLock } from './modules/bodyLock';
import { initHeader } from './modules/header';
import { initDecor } from './modules/decor';
import { initSelects } from './modules/select';
import initSliders from './modules/sliders';
import { initPhoneMasks } from './modules/inputMask';
import { initCountTextareas } from './modules/textarea';
import { initForm } from './modules/form-validator';
import { initVideo } from './modules/video';
import { initFileUploader } from './modules/fileUploader';

function initModules() {
    initBodyLock();
    initHeader();
    initDecor();
    initSelects();
    initSliders();
    initPhoneMasks();
    initCountTextareas();
    initFileUploader();
    initForm();
    initVideo();

    document.body.classList.add('_loaded');
};

document.addEventListener('DOMContentLoaded', initModules);