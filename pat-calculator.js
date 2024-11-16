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
    form.form.addEventListener('change', () => this.calculate())
    this.calculate()
  }

  calculate () {
    const { prep, drug, integration, rates } = this.form

    const totalHours = {
      licensed: (
        (prep.hours * prep.licensed / prep.patients) +
        (drug.licensedHours / drug.patients) +
        (integration.hours * integration.licensed / integration.patients)
      ),
      unlicensed: (
        (prep.hours * prep.unlicensed / prep.patients) +
        (drug.unlicensedHours / drug.patients) +
        (integration.hours * integration.unlicensed / integration.patients)
      ),
      physician: drug.physicianHours / drug.patients,
    }

    this.output.totalLicensedHours.textContent = formatHours(totalHours.licensed)
    this.output.totalUnlicensedHours.textContent = formatHours(totalHours.unlicensed)
    this.output.totalPhysicianHours.textContent = formatHours(totalHours.physician)

    this.output.totalCost.textContent = formatMoney(totalHours.licensed * rates.licensed + totalHours.unlicensed * rates.unlicensed + totalHours.physician * rates.physician)
  }
}

function formatHours(hours) {
  if (hours === 1) {
    return '1 hour'
  } else if (hours % 1) {
    return hours.toFixed(1) + ' hours'
  } else {
    return hours.toFixed(0) + ' hours'
  }
}

function formatMoney (dollars) {
  return '$' + dollars.toFixed(0)
}
