import { SliderInput } from "./slider-input.js";
import { PatForm } from "./pat-form.js";
import { PatCalculator } from "./pat-calculator.js";

export default function main() {
  SliderInput.register();

  const form = new PatForm(document.querySelector("form"));
  const calc = new PatCalculator(form, document.querySelector("#output"));
}
