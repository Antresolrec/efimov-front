import '../scss/app.scss';

import { initBodyLock } from './modules/bodyLock';
import { initHeader } from './modules/header';
import { initDecor } from './modules/decor';
import { initCounter } from './modules/counter';
import { initTicker } from './modules/ticker';
import initSliders from './modules/sliders';
import { initSelects } from './modules/select';
import { initPhoneMasks } from './modules/inputMask';
import { initCountTextareas } from './modules/textarea';
import { initFileUploader } from './modules/fileUploader';
import { initForm } from './modules/form-validator';
import { initVideo } from './modules/video';
import initPopups from './modules/popups';
import { initStickySection } from './modules/stickySection';
import { initSwitch } from './modules/switch';

function initModules() {
    initBodyLock();
    initHeader();
    initDecor();
    initCounter()
    initTicker();
    initSliders();
    initSelects();
    initPhoneMasks();
    initCountTextareas();
    initFileUploader();
    initForm();
    initVideo();
    initPopups();
    initStickySection();
    initSwitch();

    document.body.classList.add('_loaded');
};

document.addEventListener('DOMContentLoaded', initModules);