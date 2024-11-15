export class SliderInput extends HTMLElement {
  static register () {
    customElements.define('slider-input', SliderInput)
  }

  static observedAttributes = ['value', 'min', 'max', 'step', 'name', 'required', 'prefix', 'suffix']

  constructor () {
    super()

    const template = document.getElementById('slider-input-template')
    this.attachShadow({mode: 'open', delegatesFocus: true})
      .appendChild(template.content.cloneNode(true))
    this.#rangeInput.addEventListener('input', () => {
      this.#numberInput.value = this.#rangeInput.value
    })
    this.#numberInput.addEventListener('input', () => {
      this.#rangeInput.value = this.#numberInput.value
    })
  }

  connectedCallback () {
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
    case 'name':
      this.#numberInput.name = newValue
      this.#rangeInput.name = newValue + '-range'
      break
    case 'required':
      this.#numberInput.required = !!newValue
      break
    case 'prefix':
    case 'suffix':
      this.shadowRoot.querySelector('.' + name).textContent = newValue
      break
    default:
      this.#numberInput.setAttribute(name, newValue)
      this.#rangeInput.setAttribute(name, newValue)
      break
    }
  }

  /** @returns {HTMLInputElement} */
  get #rangeInput () {
    return this.shadowRoot.querySelector('input[type="range"]')
  }

  /** @returns {HTMLInputElement} */
  get #numberInput () {
    return this.shadowRoot.querySelector('input[type="number"]')
  }

  /** @returns {HTMLSpanElement} */
  get #prefixSpan () {
    return this.shadowRoot.querySelector('.prefix')
  }

  /** @returns {HTMLSpanElement} */
  get #suffixSpan () {
    return this.shadowRoot.querySelector('.suffix')
  }

  get value () {
    return parseFloat(this.#numberInput.value)
  }

  set value (val) {
    this.#numberInput.value = val
    this.#rangeInput.value = val
  }
}
