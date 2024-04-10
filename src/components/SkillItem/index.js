import './index.css'

const SkillItem = props => {
  const {item} = props
  const {imageUrl, name} = item
  return (
    <li className="skillContainer">
      <img className="imageSkillUrl" src={imageUrl} alt={name} />
      <p className="skillname">{name}</p>
    </li>
  )
}

export default SkillItem
