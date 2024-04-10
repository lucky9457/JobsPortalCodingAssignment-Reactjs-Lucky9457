import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'
import './index.css'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobCard from '../SimilarJobCard'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class jobItemDetails extends Component {
  state = {
    skillset: [],
    apiStat: apiStatus.initial,
    jobDetails: {},
    similarJobsList: [],
    lifeatCompany: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  retryFailure = () => {
    this.getJobItemDetails()
  }

  renderJobFailureView = () => (
    <div className="failureContJObDetails">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="JobDetailsfailureviewimage"
      />
      <h1 className="jobDetails-failureHead">Oops! Something Went Wrong</h1>
      <p className="jobDetails-descFailure">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.retryFailure}
        type="button"
        className="jobDetails-btnRetry"
      >
        Retry
      </button>
    </div>
  )

  LoadingView = () => (
    <div className="JobDetails-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getJobItemDetails = async () => {
    this.setState({
      apiStat: apiStatus.loading,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwt = Cookies.get('jwt_token')

    console.log(id)

    const options = {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const responsejson = await response.json()
      console.log(responsejson)

      const updatedJobDetails = {
        jobDetails: responsejson.job_details,
        similarJobs: responsejson.similar_jobs,
      }
      console.log(updatedJobDetails)
      const {jobDetails, similarJobs} = updatedJobDetails
      const updatedJobData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        pacakgePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      const {skills, lifeAtCompany} = updatedJobData
      const updatedLifeAtcompany = {
        imageUrl: lifeAtCompany.image_url,
        description: lifeAtCompany.description,
      }

      console.log(updatedLifeAtcompany)

      const updatedSkill = skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: updatedJobData,
        similarJobsList: updatedSimilarJobs,
        apiStat: apiStatus.success,
        skillset: updatedSkill,
        lifeatCompany: updatedLifeAtcompany,
      })
    } else {
      this.setState({
        apiStat: apiStatus.failure,
      })
    }
  }

  successViewJObDetails = () => {
    const {similarJobsList, jobDetails, skillset, lifeatCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,

      location,
      pacakgePerAnnum,
      rating,

      title,
    } = jobDetails

    const {description, imageUrl} = lifeatCompany

    return (
      <>
        <div className="bottomContainerJObdetails">
          <div className="joblistItem">
            <div className="LogoTitleAndRatingContainer">
              <div>
                <img src={companyLogoUrl} alt={title} className="logoCompany" />
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
              <p className="package">{pacakgePerAnnum}</p>
            </div>
            <hr className="horizontallineJObsList" />
            <div className="descriptionAndWebisteLinkContainer">
              <h1 className="descriptionHead">Description</h1>
              <a
                target="__blank"
                className="visitIconAndTextContainer"
                href={companyWebsiteUrl}
              >
                <p className="visitlink">Visit</p>
                <FaExternalLinkAlt className="iconLink" />
              </a>
            </div>
            <p className="jobDescription">{jobDescription}</p>
            <h1 className="skillsHead">Skills</h1>
            <ul className="skillSetContainer">
              {skillset.map(each => (
                <SkillItem item={each} key={each.name} />
              ))}
            </ul>
            <h1 className="lifeAtCompanyHead">Life at Company</h1>
            <div className="lifeAtCompanyContainer">
              <p className="descriptionCompanyLife">{description}</p>
              <img
                src={imageUrl}
                alt="company life"
                className="companyLifeImage"
              />
            </div>
          </div>

          <h1 className="similarJobsHead">Similar Jobs</h1>
          <ul className="similarJobsContainer">
            {similarJobsList.map(each => (
              <SimilarJobCard similarItem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  jobDetailsCheckStatus = () => {
    const {apiStat} = this.state
    switch (apiStat) {
      case apiStatus.success:
        return this.successViewJObDetails()
      case apiStatus.failure:
        return this.renderJobFailureView()
      case apiStatus.loading:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.jobDetailsCheckStatus()}
      </div>
    )
  }
}
export default jobItemDetails
