export default class Video {
    constructor() {
        this.names = {
            active: '_active',
            canPlay: '_can-play',
            playing: '_playing',
            static: '_static',
        }

        this.offsetTop = -30;
        this.delayCheckLoad = 500;

        this.selectors = document.querySelectorAll('.js-video');

        if (this.selectors.length > 0) {
            this.init();
        }
    }

    init() {
        this.bindMethods();
        this.addListenerScroll();
        this.addListenerTriggerClick();
        this.checkLoadAll();
    }

    bindMethods() {
        this.scrollHandler = this.scrollHandler.bind(this);
        this.onTriggerClick = this.onTriggerClick.bind(this);
    }

    addListenerScroll() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    scrollHandler(e) {
        this.onScroll(e);
    }

    onScroll(e) {
        for (const el of this.selectors) {
            if (this.getPos(el).bottom - window.innerHeight < 0) {
                if (el.classList.contains(this.names.canPlay) && !el.classList.contains(this.names.playing) && !el.classList.contains(this.names.static)) {
                    this.playVideo(el);
                }
            }
        }
    }

    playVideo(el) {
        el.classList.add(this.names.playing);
        setTimeout(() => {
            el.play();
        }, 300);
        // el.removeAttribute('controls');
    }

    checkLoad(el) {
        if (!el.classList.contains(this.names.canPlay)) {
            if (el.readyState > 0) {
                el.classList.add(this.names.canPlay);
                this.onScroll();
            } else {
                setTimeout(() => {
                    this.checkLoad(el);
                }, this.delayCheckLoad);
            }
        }
    }

    addListenerTriggerClick() {
        for (const el of this.selectors) {
            const wrapper = el.closest('.js-video-wrapper');
            if (wrapper) {
                const btnPlay = wrapper.querySelector('.js-video-play');
                if (btnPlay) {
                    btnPlay.addEventListener('click', this.onTriggerClick);
                }
            }
        }

    }

    checkLoadAll() {
        for (const el of this.selectors) {
            this.checkLoad(el);
        }
    }

    onTriggerClick(e) {
        const { target } = e;
        const wrapper = target.closest('.js-video-wrapper');
        const el = wrapper.querySelector('.js-video');
        if (el.classList.contains(this.names.canPlay) && !el.classList.contains(this.names.playing)) {
            this.playVideo(el);
        }
    }

    getPos(el) {
        const { top, bottom } = el.getBoundingClientRect();
        const pointTop = top - this.offsetTop;
        const pointBottom = bottom - this.offsetTop;

        return {
            top: pointTop,
            bottom: pointBottom,
        };
    }
}

export function initVideo() {
    new Video();
}