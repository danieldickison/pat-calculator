import { SliderInput } from './slider-input.js'
import { PatCalculator } from './pat-calculator.js'

export default function main () {
  SliderInput.register()

  const form = document.querySelector('form')
  const output = document.querySelector('#output')
  const calc = new PatCalculator(form, output)
}
