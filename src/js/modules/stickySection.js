export default class StickySection {
    constructor(selector) {
        if (!selector) {
            return;
        }

        this.data = {
            class: {
                active: '_active',
            },
            names: [],
            blocks: [],
        }

        this.list = selector;
        this.links = this.list.querySelectorAll('[data-href]');
    
        this.init();
    }

    init() {
        this.bindMethods();
        this.addListeners();
        this.getNames();
        this.setBlocks();
        this.onScroll();
    }

    bindMethods() {
        this.onScroll = this.onScroll.bind(this)
    }

    addListeners() {
        document.addEventListener('scroll', this.onScroll);
        document.addEventListener('resize', this.onScroll);
    }

    isBlockInWindow(el) {
        const { top, bottom } = el.getBoundingClientRect();
        const pointTop = top - document.querySelector('.js-header').clientHeight.toFixed();
        const pointBottom = bottom - document.querySelector('.js-header').clientHeight.toFixed();
    
        return pointTop < 1 && pointBottom > 1;
    }

    
    onScroll(e) {
        this.setCurBlock();
    }

    setCurBlock() {
        for (const link of this.links) {
            link.classList.remove(this.data.class.active);
        }
    
        for (let index = 0; index < this.data.blocks.length; index++) {
            const block = this.data.blocks[index];
            if (this.isBlockInWindow(block)) {
                this.links[index].classList.add(this.data.class.active);
                break;
            }
        }
    }

    setBlocks() {
        for (const name of this.data.names) {
            this.data.blocks.push(document.querySelector(`#${name}`));
        }
    }
    getNames() {

        for (const link of this.links) {
            this.data.names.push(link.dataset.href);
        }
    }
}

export function initStickySection() {
    const selectors = document.querySelectorAll('.js-sticky-side-list');

    for (const el of selectors) {
        new StickySection(el);
    }
}