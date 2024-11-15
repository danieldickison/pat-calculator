import { SliderInput } from "./slider-input.js"

export class PatForm {
  constructor (form) {
    this.form = form

    form.elements.drug_session.addEventListener('change', () => this.#reactToDrugChange())
    form.elements.licensed_therapists_drug.addEventListener('input', (e) => this.#reactToTherapistChange('licensed_therapists_hours', e.currentTarget.value))
    form.elements.unlicensed_therapists_drug.addEventListener('input', (e) => this.#reactToTherapistChange('unlicensed_therapists_hours', e.currentTarget.value))
  }

  #reactToDrugChange () {
    const index = this.form.elements.drug_session.selectedIndex
    const option = this.form.elements.drug_session[index]
    if (option) {
      this.form.elements.drug_hours.value = option.dataset.hours
    }
  }

  #reactToTherapistChange (selectorBase, count) {
    const container = this.form.querySelector(`.container.${selectorBase}`)
    const template = this.form.querySelector(`template.${selectorBase}`)
    const delta = count - container.children.length
    if (delta > 0) {
      for (let i = 0; i < delta; i++) {
        const clone = template.content.cloneNode(true)
        clone.querySelector('.number').textContent = `#${count - delta + i + 1}`
        container.appendChild(clone)
        // TODO: fiddle with input name etc
      }
    } else if (delta < 0) {
      for (let i = 0; i < -delta; i++) {
        container.removeChild(container.lastElementChild)
      }
    }
  }

  get participants () {
    return this.form.elements.participants.value
  }

  get prep () {
    return {
      licensed: this.form.elements.licensed_therapists_prep.value,
      unlicensed: this.form.elements.unlicensed_therapists_prep.value,

      hours: this.form.elements.prep_hours.value,
      patients: this.form.elements.patients_prep.value,
    }
  }

  get drug () {
    const getMultipleValueSum = (name) => {
      const el = this.form.elements[name]
      if (!el) {
        return 0
      } else if (el instanceof SliderInput) {
        return el.value
      } else {
        return [...el]
          .reduce((acc, el) => acc + Number(el.value), 0)
      }
    }
    return {
      hours: this.form.elements.drug_hours.value,
      sessions: this.form.elements.drug_sessions.value,

      licensedHours: getMultipleValueSum('licensed_therapists_hours'),
      unlicensedHours: getMultipleValueSum('unlicensed_therapists_hours'),
      physicianHours: getMultipleValueSum('physician_hours'),

      patients: this.form.elements.patients_drug.value,
    }
  }

  get integration() {
    return {
      licensed: this.form.elements.licensed_therapists_integration.value,
      unlicensed: this.form.elements.unlicensed_therapists_integration.value,

      hours: this.form.elements.integration_hours.value,
      patients: this.form.elements.patients_integration.value,
    }
  }

  get rates() {
    return {
      licensed: this.form.elements.rate_licensed.value,
      unlicensed: this.form.elements.rate_unlicensed.value,
      physician: this.form.elements.rate_physician.value,
    }
  }
}
