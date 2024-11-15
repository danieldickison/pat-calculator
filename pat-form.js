export class PatForm {
  constructor (form) {
    this.form = form
  }

  get prep () {
    return {
      hours: this.form.elements.prep_hours.value,
      licensed: this.form.elements.licensed_therapists_prep.value,
      unlicensed: this.form.elements.unlicensed_therapists_prep.value,
      patients: this.form.elements.patients_prep.value,
    }
  }

  get drug () {
    return {
      hours: this.form.elements.drug_hours.value,
      sessions: this.form.elements.drug_sessions.value,

      // TODO: these are multiple values
      licensed_hours: this.form.elements.licensed_therapists_hours?.value ?? 0,
      unlicensed_hours: this.form.elements.unlicensed_therapists_hours?.value ?? 0,
      physician_hours: this.form.elements.physician_hours?.value ?? 0,

      patients: this.form.elements.patients_drug.value,
    }
  }

  get integration() {
    return {
      hours: this.form.elements.integration_hours.value,
      licensed: this.form.elements.licensed_therapists_integration.value,
      unlicensed: this.form.elements.unlicensed_therapists_integration.value,
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
