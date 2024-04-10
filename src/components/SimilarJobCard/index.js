import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobCard = props => {
  const {similarItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarItem
  return (
    <li className="similarItemContainer">
      <div className="LogoTitleAndRatingContainerSimilar">
        <div>
          <img src={companyLogoUrl} alt={title} className="logoCompany" />
        </div>
        <div>
          <h1 className="similarjobtitle">{title}</h1>
          <div className="similarRatingCont">
            <BsStarFill className="SimilarstarIcon" />
            <p className="similarRatingValue">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="jobDescriptionSimilarHeading">Description</h1>
      <p className="similarJobDesc">{jobDescription}</p>
      <div className="SimilarCard-LocationAndJobtypeContainer">
        <IoLocationSharp className="SimilarJob-LocationIcon" />
        <p className="locationSimilarCard">{location}</p>
        <BsBriefcaseFill className="SimilarJob-LocationIcon" />
        <p className="similarJobEmplomentType">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
