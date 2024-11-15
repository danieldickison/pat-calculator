export class SliderInput extends HTMLElement {
  static register () {
    customElements.define('slider-input', SliderInput)
  }

  static observedAttributes = ['value', 'min', 'max', 'step', 'required', 'prefix', 'suffix']
  static formAssociated = true

  #shadowRoot
  #elementInternals

  constructor () {
    super()

    const template = document.getElementById('slider-input-template')
    this.#shadowRoot = this.attachShadow({mode: 'closed', delegatesFocus: true})
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#elementInternals = this.attachInternals()

    this.#rangeInput.addEventListener('input', () => {
      this.#numberInput.value = this.#rangeInput.value
      this.#elementInternals.setFormValue(this.#rangeInput.value)
    })
    this.#numberInput.addEventListener('input', () => {
      this.#rangeInput.value = this.#numberInput.value
      this.#elementInternals.setFormValue(this.#numberInput.value)
    })
  }

  connectedCallback () {
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
    case 'required':
      this.#numberInput.required = !!newValue
      break
    case 'prefix':
    case 'suffix':
      this.#shadowRoot.querySelector('.' + name).textContent = newValue
      break
    case 'value':
      this.value = parseFloat(newValue)
      break
    default:
      this.#numberInput.setAttribute(name, newValue)
      this.#rangeInput.setAttribute(name, newValue)
      break
    }
  }

  /** @returns {HTMLInputElement} */
  get #rangeInput () {
    return this.#shadowRoot.querySelector('input[type="range"]')
  }

  /** @returns {HTMLInputElement} */
  get #numberInput () {
    return this.#shadowRoot.querySelector('input[type="number"]')
  }

  get value () {
    return parseFloat(this.#numberInput.value)
  }

  set value (val) {
    this.#numberInput.value = val
    this.#rangeInput.value = val
    this.#elementInternals.setFormValue(val)
  }
}
