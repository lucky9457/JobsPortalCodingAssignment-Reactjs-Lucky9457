import './index.css'

const EmploymentType = props => {
  const {item} = props
  return (
    <div className="employtypeCont">
      <input
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
