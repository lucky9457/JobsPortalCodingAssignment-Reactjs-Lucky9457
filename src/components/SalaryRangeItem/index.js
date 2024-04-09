import './index.css'

const SalaryRangeItem = props => {
  const {items} = props
  return (
    <div className="SalaryRangeCont">
      <input
        name="RadioGroup"
        value={`${items.salaryRangeId}`}
        className="SalaryRangeRadio"
        type="radio"
        id={`item${items.salaryRangeId}`}
      />
      <label
        htmlFor={`item${items.salaryRangeId}`}
        className="labelSalaryRange"
      >
        {items.label}
      </label>
    </div>
  )
}
export default SalaryRangeItem
