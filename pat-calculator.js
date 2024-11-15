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
    const { participants, prep, drug, integration, rates } = this.form
    const prepGroups = Math.ceil(participants / prep.patients)
    const drugSessions = drug.sessions * Math.ceil(participants / drug.patients)
    const integrationGroups = Math.ceil(participants / integration.patients)

    const totalHours = {
      licensed: (
        prepGroups * prep.hours * prep.licensed +
        drugSessions * drug.licensedHours +
        integrationGroups * integration.hours * integration.licensed
      ),
      unlicensed: (
        prepGroups * prep.hours * prep.unlicensed +
        drugSessions * drug.unlicensedHours +
        integrationGroups * integration.hours * integration.unlicensed
      ),
      physician: drugSessions * drug.physicianHours,
    }

    this.output.totalLicensedHours.textContent = totalHours.licensed
    this.output.totalUnlicensedHours.textContent = totalHours.unlicensed
    this.output.totalPhysicianHours.textContent = totalHours.physician

    this.output.totalCost.textContent = totalHours.licensed * rates.licensed + totalHours.unlicensed * rates.unlicensed + totalHours.physician * rates.physician
  }
}
