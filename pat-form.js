import { SliderInput } from "./slider-input.js"

export class PatForm {
  constructor(form) {
    this.form = form

    form.elements.drug_type.addEventListener('change', () => this.#reactToDrugChange())
    form.elements.drug_hours.addEventListener('change', () => this.#reactToDrugHoursChange())

    form.elements.licensed_therapists_drug.addEventListener('input', (e) => this.#reactToTherapistChange('licensed_therapists_hours', e.currentTarget.value))
    form.elements.unlicensed_therapists_drug.addEventListener('input', (e) => this.#reactToTherapistChange('unlicensed_therapists_hours', e.currentTarget.value))

    for (const radio of form.elements.physician_needed) {
      radio.addEventListener('change', () => this.#reactToPhysicianChange())
    }
    form.elements.different_sessions.addEventListener('change', () => this.#reactToPhysicianChange())
    form.elements.drug_sessions.addEventListener('input', () => this.#reactToPhysicianChange())

    this.#reactToDrugChange()
    this.#reactToTherapistChange('licensed_therapists_hours', form.elements.licensed_therapists_drug.value)
    this.#reactToTherapistChange('unlicensed_therapists_hours', form.elements.unlicensed_therapists_drug.value)
    this.#reactToPhysicianChange()
  }

  #reactToDrugChange () {
    const index = this.form.elements.drug_type.selectedIndex
    const option = this.form.elements.drug_type[index]
    if (option) {
      this.form.elements.drug_hours.value = option.dataset.hours
    }
  }

  #reactToDrugHoursChange () {
    // Default all provider hours to new drug session duration
    const hours = this.form.elements.drug_hours.value

    const setOne = (sliderOrNodelist) => {
      if (sliderOrNodelist instanceof SliderInput) {
        sliderOrNodelist.setAttribute('max', hours)
        sliderOrNodelist.value = hours
      } else if (sliderOrNodelist) {
        for (const slider of sliderOrNodelist) setOne(slider)
      }
    }
    setOne(this.form.elements.licensed_therapists_hours)
    setOne(this.form.elements.unlicensed_therapists_hours)
    setOne(this.form.elements.physician_hours)
  }

  #reactToTherapistChange (selectorBase, count) {
    const container = this.form.querySelector(`.container.${selectorBase}`)
    const template = this.form.querySelector(`template.${selectorBase}`)
    const drugHours = this.form.elements.drug_hours.value
    const delta = count - container.childElementCount
    if (delta > 0) {
      for (let i = 0; i < delta; i++) {
        const clone = template.content.cloneNode(true)
        clone.querySelector('.number').textContent = `#${count - delta + i + 1}`
        clone.querySelector('slider-input').setAttribute('max', drugHours)
        clone.querySelector('slider-input').setAttribute('value', drugHours)
        container.appendChild(clone)
      }
    } else if (delta < 0) {
      for (let i = 0; i < -delta; i++) {
        container.removeChild(container.lastElementChild)
      }
    }
  }

  #reactToPhysicianChange () {
    const needed = this.form.elements.physician_needed.value === '1'
    const hoursContainer = this.form.querySelector('.container.physician_hours')
    const sessionsContainer = this.form.querySelector('.container.physician_hours > .physician_sessions')
    const currentHours = Array.from(sessionsContainer.querySelectorAll('slider-input')).map(el => el.value)
    while (sessionsContainer.lastElementChild) sessionsContainer.removeChild(sessionsContainer.lastElementChild)

    if (!needed) {
      hoursContainer.style.display = 'none'
      return
    }

    hoursContainer.style.display = null

    const sessions = this.form.elements.drug_sessions.value
    if (sessions === 1) {
      this.form.elements.different_sessions.checked = false
    }
    this.form.elements.different_sessions.disabled = sessions === 1
    this.form.querySelector('.different_sessions_wrapper').style.display = sessions === 1 ? 'none' : null

    const drugHours = this.form.elements.drug_hours.value
    const diffHours = this.form.elements.different_sessions.checked
    if (diffHours) {
      for (let i = 0; i < sessions; i++) {
        const clone = this.form.querySelector('template.physician_hours_multi').content.cloneNode(true)
        clone.querySelector('.number').textContent = `#${i + 1}`
        clone.querySelector('slider-input').setAttribute('max', drugHours)
        clone.querySelector('slider-input').setAttribute('value', Math.min(drugHours, currentHours[i] ?? drugHours))
        sessionsContainer.appendChild(clone)
      }
    } else {
      const clone = this.form.querySelector('template.physician_hours_single').content.cloneNode(true)
      clone.querySelector('slider-input').setAttribute('max', drugHours)
      clone.querySelector('slider-input').setAttribute('value', Math.min(drugHours, currentHours[0] ?? drugHours))
      sessionsContainer.appendChild(clone)
    }
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
      physicianHours: (
        this.form.elements.different_sessions.checked ?
        getMultipleValueSum('physician_hours') :
        (this.form.elements.physician_hours?.value ?? 0) * this.form.elements.drug_sessions.value
      ),

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
