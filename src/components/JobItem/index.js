import {Link} from 'react-router-dom'
import './index.css'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

const JobItem = props => {
  const {jobitem} = props
  const {
    componyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobitem
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="joblistItem">
        <div className="LogoTitleAndRatingContainer">
          <div>
            <img src={componyLogoUrl} alt={title} className="logoCompany" />
          </div>
          <div>
            <h1 className="jobtitle">{title}</h1>
            <div className="ratingCont">
              <BsStarFill className="starIcon" />
              <p className="ratingValue">{rating}</p>
            </div>
          </div>
        </div>
        <div className="employtypeandSalaryRangeCont">
          <div className="locationAndEmploytypeContainer">
            <IoLocationSharp className="locationIcon" />
            <p className="locationJob">{location}</p>
            <BsBriefcaseFill className="locationIcon" />
            <p className="locationJob">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontallineJObsList" />
        <p className="descriptionHead">Description</p>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
