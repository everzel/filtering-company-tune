require('./index.css').toString();
const {make} = require('./util');

import IconStretched from './assets/stretched.svg';

/**
 * This Block Tunes allows user to select some of predefined text variant.
 *
 * @see TextVariant enum for the details.
 * @uses Block Tunes API  {@link https://editorjs.io/block-tunes-api}
 */
export default class StretchTune {
    /**
     * Tune constructor. Called on Block creation
     *
     * @param {object} options - constructor params
     * @param {API} api - editor.js Core API
     * @param {BlockAPI} block - editor.js Block API
     * @param {boolean} data - previously saved data
     * @param {Object} config - configuration supported by Tune
     */
    constructor({ api, data, config, block }) {
        this.api = api;
        this.data = Boolean(data || false);
        this.config = config;
        this.block = block;

        this.settings = Object.assign({}, config, {
            icon: IconStretched,
            title: this.api.i18n.t('Stretched'),
        })

        // this.wrapper = undefined;
    }

    /**
     * Tell editor.js that this Tool is a Block Tune
     *
     * @returns {boolean}
     */
    static get isTune() {
        return true;
    }

    /**
     * CSS selectors used in Tune
     */
    static get CSS() {
        return {
            wrapper: 'cdx-stretch-tune--wrapper',
            applied: 'cdx-stretch-tune--applied',
        };
    }

    /**
     * Create Tunes controls wrapper that will be appended to the Block Tunes panel
     *
     * @returns {Element}
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

        toggler.dataset.name = 'stretched';

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
     * Handler for Tune controls click
     *
     * @param {MouseEvent} event - click
     * @returns {void}
     */
    tuneClicked(event) {
        this.data = !this.data;

        this.wrapper.classList.toggle(StretchTune.CSS.applied, this.data);
    }

    /**
     * Wraps Block Content to the Tunes wrapper
     *
     * @param {Element} blockContent - editor.js block inner container
     * @returns {Element} - created wrapper
     */
    wrap(blockContent) {
        this.wrapper = make('div', StretchTune.CSS.wrapper);

        this.wrapper.classList.toggle(StretchTune.CSS.applied, !!this.data);

        this.wrapper.appendChild(blockContent);

        return this.wrapper;
    }

    /**
     * Returns Tune state
     *
     * @returns {boolean}
     */
    save() {
        return Boolean(this.data || false);
    }
}
