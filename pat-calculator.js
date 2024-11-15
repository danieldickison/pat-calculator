export class PatCalculator {
  constructor (form, output) {
    this.form = form
    this.output = {
      totalLicensedHours: output.querySelector('#total_licensed_hours'),
      totalUnlicensedHours: output.querySelector('#total_unlicensed_hours'),
      totalPhysicianHours: output.querySelector('#total_physician_hours'),
      totalCost: output.querySelector('#total_cost'),
    }
    form.form.addEventListener('input', () => this.calculate())
  }

  calculate () {
    const { prep, drug, integration, rates } = this.form

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
