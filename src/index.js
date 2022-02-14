require('./index.css').toString();
const {make} = require('./util');

import Icon from './assets/icon.svg';

export default class CompanyFilteredTune {
    /**
     *
     * @param api
     * @param data
     * @param config
     * @param block
     */
    constructor({ api, data, config, block }) {
        this.api = api;
        this.data = Boolean(data || false);
        this.config = config;
        this.block = block;

        this.settings = Object.assign({}, config, {
            icon: Icon,
            title: this.api.i18n.t('Company Filtered') ?? 'Company Filtered',
        })

        // this.wrapper = undefined;
    }

    /**
     *
     * @returns {boolean}
     */
    static get isTune() {
        return true;
    }

    /**
     *
     * @returns {{applied: string, wrapper: string}}
     * @constructor
     */
    static get CSS() {
        return {
            wrapper: 'cdx-company-filtered-tune--wrapper',
            applied: 'cdx-company-filtered-tune--applied',
        };
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const wrapper = make('div', '');

        const classes = [this.api.styles.settingsButton];

        if (this.data) {
            classes.push(this.api.styles.settingsButtonActive);
        }

        const toggler = make('div', classes, {
            innerHTML: this.settings.icon,
        });

        toggler.dataset.name = 'company-filtered';

        this.api.tooltip.onHover(toggler, this.settings.title, {
            placement: 'top',
            hidingDelay: 500,
        });

        wrapper.appendChild(toggler);

        /**
         * Delegate click event on all the controls
         */
        this.api.listeners.on(wrapper, 'click', (event) => {
            this.tuneClicked(event);

            toggler.classList.toggle(this.api.styles.settingsButtonActive, this.data)
        });

        return wrapper;
    }

    /**
     *
     * @param event
     */
    tuneClicked(event) {
        this.data = !this.data;

        this.wrapper.classList.toggle(CompanyFilteredTune.CSS.applied, this.data);
    }

    /**
     *
     * @param blockContent
     * @returns {*}
     */
    wrap(blockContent) {
        this.wrapper = make('div', CompanyFilteredTune.CSS.wrapper);

        this.wrapper.classList.toggle(CompanyFilteredTune.CSS.applied, !!this.data);

        this.wrapper.appendChild(blockContent);

        return this.wrapper;
    }

    /**
     *
     * @returns {boolean}
     */
    save() {
        return Boolean(this.data || false);
    }
}
