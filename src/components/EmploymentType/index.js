import './index.css'

const EmploymentType = props => {
  const {item, checkedChange} = props
  const checkedOrNot = event => {
    checkedChange(event.target.checked, item.employmentTypeId)
  }
  return (
    <div className="employtypeCont">
      <input
        onChange={checkedOrNot}
        type="checkbox"
        className="checkbox"
        id={`type${item.employmentTypeId}`}
      />
      <label htmlFor={`type${item.employmentTypeId}`} className="labelType">
        {item.label}
      </label>
    </div>
  )
}

export default EmploymentType
