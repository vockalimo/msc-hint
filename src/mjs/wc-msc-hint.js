import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const defaults = {
  hover: false,
  autoposition: false,
};

const booleanAttrs = ['hover', 'autoposition']; // booleanAttrs default should be false
const objectAttrs = [];
const custumEvents = {};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host{position:relative;inline-size:fit-content;aspect-ratio:1/1;display:block;}
:host(:focus-within){pointer-events:none;}

.main {
  --size: var(--msc-hint-trigger-size, 36px);
  --gap: var(--msc-hint-gap, 8px);
  --transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  --trigger-color: var(--msc-hint-trigger-color, rgba(110 119 128));
  --trigger-background-color: var(--msc-hint-trigger-background-color, rgba(0 0 0/.04));
  --trigger-icon-size: var(--msc-hint-trigger-icon-size, 24px);
  --trigger-icon-path: var(
    --msc-hint-trigger-icon-path,
    path('M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z')
  );
  --trigger-icon-scale: var(--msc-hint-trigger-icon-scale, 1);
  --trigger-overlay-color: var(--msc-hint-trigger-overlay-color, rgba(29 34 40/.2));
  --trigger-active-scale: var(--msc-hint-trigger-active-scale, .9);

  --panel-border-radius: var(--msc-hint-panel-border-radius, 8px);
  --panel-padding: var(--msc-hint-panel-padding, 8px);
  --panel-background-color: var(--msc-hint-panel-background-color, rgba(255 255 255/.9));
  --panel-border-color: var(--msc-hint-panel-border-color, rgba(199 205 210));
  --panel-box-shadow: var(--msc-hint-panel-box-shadow, 0 0 1px rgba(0 0 0/.1), 0 2px 4px rgba(0 0 0/ .08));

  --panel-opacity-normal: 0;
  --panel-opacity-active: 1;
  --panel-opacity: var(--panel-opacity-normal);

  --panel-scale-normal: 0.001;
  --panel-scale-active: 1;
  --panel-scale: var(--panel-scale-normal);

  --panel-pointer-events-normal: none;
  --panel-pointer-events-active: auto;
  --panel-pointer-events: var(--panel-pointer-events-normal);

  position: relative;
  inline-size: var(--size);
  aspect-ratio: 1/1;
  display: block;
  outline: 0 none;

  &:focus-within {
    --panel-opacity: var(--panel-opacity-active);
    --panel-scale: var(--panel-scale-active);

    --trigger-pointer-events: var(--trigger-pointer-events-active);
    --panel-pointer-events: var(--panel-pointer-events-active);

    .main__trigger {
      --trigger-overlay-opacity: var(--trigger-overlay-opacity-active);
    }
  }

  @media (hover: hover) {
    &.main--hover:hover {
      --panel-opacity: var(--panel-opacity-active);
      --panel-scale: var(--panel-scale-active);

      --trigger-pointer-events: var(--trigger-pointer-events-active);
      --panel-pointer-events: var(--panel-pointer-events-active);
    }
  }
  
  .main__trigger {
    inline-size: var(--size);
    aspect-ratio: 1/1;
    font-size: 0;
    color: var(--trigger-color);
    appearance: none;
    box-shadow: unset;
    border: unset;
    background: transparent;
    user-select: none;
    display: block;
    border-radius: var(--size);
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--trigger-background-color);
    pointer-events: var(--trigger-pointer-events);
    outline: 0 none;
    
    display: grid;
    place-content:center;

    &:active {
      scale: var(--trigger-active-scale);
    }

    &::before {
      position: relative;
      inline-size: var(--trigger-icon-size);
      aspect-ratio: 1/1;
      content: '';
      background-color: currentColor;
      display: block;
      clip-path: var(--trigger-icon-path);
      scale: var(--trigger-icon-scale);
      z-index: 1;
    }

    @media (hover: hover) {
      position: relative;

      --trigger-overlay-opacity-normal: 0;
      --trigger-overlay-opacity-active: 1;
      --trigger-overlay-opacity: var(--trigger-overlay-opacity-normal);

      &::after {
        position: absolute;
        inset-inline-start: 0;
        inset-block-start: 0;
        inline-size: 100%;
        block-size: 100%;
        content: '';
        background-color: var(--trigger-overlay-color);
        opacity: var(--trigger-overlay-opacity);
        transition: opacity 200ms var(--transition-timing-function);
        pointer-events: none;
      }

      &:hover {
        --trigger-overlay-opacity: var(--trigger-overlay-opacity-active);
      }
    }
  }

  .main__panel {
    --vertical: start;
    --horizontal: center;
    --inset-block: auto calc(var(--gap) * -1);
    --transform-origin-horizontal: 50%;
    --transform-origin-vertical: 0%;

    position: absolute;
    inset-block: var(--inset-block);
    inline-size: var(--size);
    block-size: 0px;
    pointer-events: var(--panel-pointer-events);

    display: grid;
    place-content: var(--vertical) var(--horizontal);

    .main__panel__ens {
      background-color: var(--panel-background-color);
      padding: var(--panel-padding);
      border-radius: var(--panel-border-radius);
      border: 1px solid var(--panel-border-color);
      box-shadow: var(--panel-box-shadow);

      opacity: var(--panel-opacity);
      scale: var(--panel-scale);
      transform-origin: var(--transform-origin-horizontal) var(--transform-origin-vertical);
      transition: scale 200ms var(--transition-timing-function), opacity 200ms var(--transition-timing-function);
      will-change: scale,opacity;
    }
  }
}

/* horizontal */
:host([data-horizontal-align="start"]) .main__panel {
  --horizontal: start;
  --transform-origin-horizontal: 0%;
}

:host([data-horizontal-align="end"]) .main__panel {
  --horizontal: end;
  --transform-origin-horizontal: 100%;
}

/* vertical */
:host([data-vertical-align="start"]) .main__panel {
  --vertical: end;
  --transform-origin-vertical: 100%;
  --inset-block: calc(var(--gap) * -1) auto;
}

.main__panel--mutation{}
</style>

<div class="main" ontouchstart="" tabindex="0">
  <button type="button" class="main__trigger">
    summery
  </button>
  <div class="main__panel">
    <div class="main__panel__ens" part="panel">
      <slot></slot>
    </div>
  </div>
</div>
`;

// Houdini Props and Vals, https://web.dev/at-property/
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-hint-trigger-size',
      syntax: '<length>',
      inherits: true,
      initialValue: '36px'
    });

    CSS.registerProperty({
      name: '--msc-hint-gap',
      syntax: '<length>',
      inherits: true,
      initialValue: '8px'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(110 119 128)'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-background-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(0 0 0/.04)'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-icon-size',
      syntax: '<length>',
      inherits: true,
      initialValue: '24px'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-icon-path',
      syntax: '*',
      inherits: true,
      initialValue: 'path("M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z")'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-icon-scale',
      syntax: '<number>',
      inherits: true,
      initialValue: '1'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-overlay-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(29 34 40/.2)'
    });

    CSS.registerProperty({
      name: '--msc-hint-trigger-active-scale',
      syntax: '<number>',
      inherits: true,
      initialValue: '0.9'
    });

    CSS.registerProperty({
      name: '--msc-hint-panel-border-radius',
      syntax: '<length>',
      inherits: true,
      initialValue: '8px'
    });

    CSS.registerProperty({
      name: '--msc-hint-panel-padding',
      syntax: '<length>',
      inherits: true,
      initialValue: '8px'
    });

    CSS.registerProperty({
      name: '--msc-hint-panel-background-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(255 255 255/.9)'
    });

    CSS.registerProperty({
      name: '--msc-hint-panel-border-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(199 205 210)'
    });
  } catch(err) {
    console.warn(`msc-hint: ${err.message}`);
  }
}

export class MscHint extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      refreshController: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      button: this.shadowRoot.querySelector('.main__trigger'),
      panel: this.shadowRoot.querySelector('.main__panel__ens'),
      panelAnchor: this.shadowRoot.querySelector('.main__panel')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscHint(config)
    };

    // evts
    this._onRefresh = this._onRefresh.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }

    if (this.#data?.refreshController) {
      this.#data.refreshController.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'autoposition':
        case 'hover':
          this.#config[attrName] = true;
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscHint.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'autoposition': {
        this.#nodes.panelAnchor.classList.remove('main__panel--mutation');
        
        if (this.autoposition) {
          this.#data.refreshController = new AbortController();
          const signal = this.#data.refreshController.signal;

          window.addEventListener('resize', this._onRefresh, { signal });
          document.addEventListener('scroll', this._onRefresh, { passive:true, signal });
        
          this._onRefresh();
        } else {
          if (this.#data?.refreshController) {
            this.#data.refreshController.abort();
          }
        }
        break;
      }

      case 'hover':
        this.#nodes.main.classList.toggle('main--hover', this.hover);
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscHint.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscHint.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }


  set hover(value) {
    this.toggleAttribute('hover', Boolean(value));
  }

  get hover() {
    return this.#config.hover;
  }

  set autoposition(value) {
    this.toggleAttribute('autoposition', Boolean(value));
  }

  get autoposition() {
    return this.#config.autoposition;
  }

  _onRefresh() {
    if (!this.autoposition) {
      return;
    }

    const { panel, panelAnchor, styleSheet } = this.#nodes;

    panelAnchor.classList.remove('main__panel--mutation');

    const { width:vW, height:vH } = _wcl.getViewportSize();
    const { x, y } = _wcl.getPosition(panel);
    const pX = x - _wcl.scrollX;
    const pY = y - _wcl.scrollY;
    const { width, height } = _wcl.getSize(panel);
    const { horizontalAlign, verticalAlign } = this.dataset;
    const defaults = {
      '--vertical': 'start',
      '--horizontal': 'center',
      '--inset-block': 'auto calc(var(--gap) * -1)',
      '--transform-origin-horizontal': '50%',
      '--transform-origin-vertical': '0%',
      ...(horizontalAlign === 'start' && {
        '--horizontal': 'start',
        '--transform-origin-horizontal': '0%'
      }),
      ...(horizontalAlign === 'end' && {
        '--horizontal': 'end',
        '--transform-origin-horizontal': '100%'
      }),
      ...(verticalAlign === 'start' && {
        '--vertical': 'end',
        '--transform-origin-vertical': '100%',
        '--inset-block': 'calc(var(--gap) * -1) auto'
      })
    };
    const needMutate = (pX < 0) || (pX + width > vW) || (pY < 0) || (pY + height > vH)
      ? true
      : false;

    if (needMutate) {
      _wcl.addStylesheetRules(
        '.main .main__panel.main__panel--mutation',
        {
          ...defaults,
          ...(pX < 0 && {
            '--horizontal': 'start',
            '--transform-origin-horizontal': '0%'
          }),
          ...((pX + width > vW) && {
            '--horizontal': 'end',
            '--transform-origin-horizontal': '100%'
          }),
          ...((pY < 0) && {
            '--vertical': 'start',
            '--inset-block': 'auto calc(var(--gap) * -1)',
            '--transform-origin-vertical': '0%',
          }),
          ...((pY + height > vH) && {
            '--vertical': 'end',
            '--transform-origin-vertical': '100%',
            '--inset-block': 'calc(var(--gap) * -1) auto'
          }),
        },
        styleSheet
      );
    }

    panelAnchor.classList.toggle('main__panel--mutation', needMutate);
  }

  refresh() {
    this._onRefresh();
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscHint');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscHint'), MscHint);
}