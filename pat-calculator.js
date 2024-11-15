export class PatCalculator {
  constructor (form, output) {
    this.form = form
    this.output = {
      totalLicensedHours: output.querySelector('#total_licensed_hours'),
      totalUnlicensedHours: output.querySelector('#total_unlicensed_hours'),
      totalPhysicianHours: output.querySelector('#total_physician_hours'),
      totalCost: output.querySelector('#total_cost'),
    }
    this.form.addEventListener('input', () => this.calculate())
  }

  calculate () {
    const prep = {
      hours: this.form.elements.prep_hours.value,
      licensed: this.form.elements.licensed_therapists_prep.value,
      unlicensed: this.form.elements.unlicensed_therapists_prep.value,
      patients: this.form.elements.patients_prep.value,
    }

    const drug = {
      hours: this.form.elements.drug_hours.value,
      sessions: this.form.elements.drug_sessions.value,

      // TODO: these are multiple values
      licensed_hours: this.form.elements.licensed_therapists_hours?.value ?? 0,
      unlicensed_hours: this.form.elements.unlicensed_therapists_hours?.value ?? 0,
      physician_hours: this.form.elements.physician_hours?.value ?? 0,

      patients: this.form.elements.patients_drug.value,
    }

    const integration = {
      hours: this.form.elements.integration_hours.value,
      licensed: this.form.elements.licensed_therapists_integration.value,
      unlicensed: this.form.elements.unlicensed_therapists_integration.value,
      patients: this.form.elements.patients_integration.value,
    }

    const rates = {
      licensed: this.form.elements.rate_licensed.value,
      unlicensed: this.form.elements.rate_unlicensed.value,
      physician: this.form.elements.rate_physician.value,
    }

    const totalHours = {
      licensed: prep.hours * prep.licensed + drug.licensed_hours + integration.hours * integration.licensed,
      unlicensed: prep.hours * prep.unlicensed + drug.unlicensed_hours + integration.hours * integration.unlicensed,
      physician: drug.physician_hours,
    }

    this.output.totalLicensedHours.textContent = totalHours.licensed
    this.output.totalUnlicensedHours.textContent = totalHours.unlicensed
    this.output.totalPhysicianHours.textContent = totalHours.physician

    this.output.totalCost.textContent = totalHours.licensed * rates.licensed + totalHours.unlicensed * rates.unlicensed + totalHours.physician * rates.physician
  }
}
