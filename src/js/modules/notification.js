export default class Notice {
    constructor() {
        this.container = null;

        this.durRender = 10;
        this.durHide = 200;
        this.durShow = 300;
        this.durActive = 4000;

        this.init();
    }



    bindMethods() {
        this.addListenerClick = this.addListenerClick.bind(this);
    }

    /**
     * 
     * @param {string} type тип иконки 'succes' - успех или 'error' - ошибка
     * @param {string} title заголовок
     * @param {string} text текст
     */
    show(type, title, text) {
        const item = document.createElement('DIV');
        item.classList.add('notice__item');

        let icon;

        if (type === 'succes') {
            icon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM16.5303 8.46973C16.2374 8.17683 15.7626 8.17683 15.4697 8.46973L11 12.9395L9.53027 11.4697L9.47363 11.418C9.17905 11.1777 8.74433 11.1951 8.46973 11.4697C8.19512 11.7443 8.17766 12.1791 8.41797 12.4736L8.46973 12.5303L10.4697 14.5303C10.6104 14.6709 10.8011 14.75 11 14.75C11.1989 14.75 11.3896 14.6709 11.5303 14.5303L16.5303 9.53027C16.8232 9.23738 16.8232 8.76262 16.5303 8.46973Z" fill="white"/>
            </svg>
            `;
        }

        if (type === 'error') {
            icon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM15.5303 8.46973C15.2374 8.17683 14.7626 8.17683 14.4697 8.46973L12 10.9395L9.53027 8.46973L9.47363 8.41797C9.17905 8.17766 8.74433 8.19512 8.46973 8.46973C8.19512 8.74433 8.17766 9.17905 8.41797 9.47363L8.46973 9.53027L10.9395 12L8.46973 14.4697C8.17683 14.7626 8.17683 15.2374 8.46973 15.5303C8.76262 15.8232 9.23738 15.8232 9.53027 15.5303L12 13.0605L14.4697 15.5303L14.5264 15.582C14.8209 15.8223 15.2557 15.8049 15.5303 15.5303C15.8049 15.2557 15.8223 14.8209 15.582 14.5264L15.5303 14.4697L13.0605 12L15.5303 9.53027C15.8232 9.23738 15.8232 8.76262 15.5303 8.46973Z" fill="#B11932"/>
            </svg>
            `;
        }

        item.innerHTML = icon;
        item.innerHTML += `
        <div class="notice__text">
            <div>${title}</div>
            <div>${text}</div>
        </div>`;

        this.container.append(item);

        setTimeout(() => {
            item.classList.add('_show');
            setTimeout(() => {
                item.classList.remove('_show');
                setTimeout(() => {
                    item.remove();
                }, this.durHide);
            }, this.durActive + this.durShow);
        }, this.durRender);
    }

    renderContainer() {
        this.container = document.createElement('DIV');
        this.container.classList.add('notice');

        document.body.append(this.container);
    }

    init() {
        this.renderContainer();
    }
}

export function initNotice() {
    const notice = new Notice();
    window.notice = notice;
}