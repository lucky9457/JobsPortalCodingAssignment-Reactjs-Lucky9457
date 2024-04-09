import {Component} from 'react'

import Cookies from 'js-cookie'
import Header from '../Header'
import SalaryRangeItem from '../SalaryRangeItem'
import EmploymentType from '../EmploymentType'

import './index.css'

const profileapistatus = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  loading: 'lOADING',
  failure: 'FAILURE',
}

const jobsapi = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  loading: 'lOADING',
  failure: 'FAILURE',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profile: {},
    jobsList: [],
    profileapi: profileapistatus.initial,
    jobstat: jobsapi.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getjobs()
  }

  profileFailureView = () => (
    <div>
      <button type="button" className="profileRetryOnFailure">
        Retry
      </button>
    </div>
  )

  getProfile = async () => {
    this.setState({
      profileapi: profileapistatus.loading,
    })
    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    }
    const responseProfile = await fetch('https://apis.ccbp.in/profile', options)
    if (responseProfile.ok) {
      const profileData = await responseProfile.json()
      console.log(profileData)
      const profileDetails = {
        profileDetail: profileData.profile_details,
      }
      const {profileDetail} = profileDetails

      const updatedProfile = {
        name: profileDetail.name,
        profileImageUrl: profileDetail.profile_image_url,
        shortBio: profileDetail.short_bio,
      }
      this.setState({
        profile: updatedProfile,
        profileapi: profileapistatus.success,
      })
    } else {
      this.setState({
        profileapi: profileapistatus.failure,
      })
    }
  }

  getjobs = async () => {
    this.setState({
      jobstat: jobsapi.loading,
    })
    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/jobs', options)
    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData.jobs)
      const updatedJobs = responseData.jobs.map(each => ({
        componyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobstat: jobsapi.success,
        jobsList: updatedJobs,
      })
    } else {
      this.setState({
        jobstat: jobsapi.failure,
      })
    }
  }

  radioChange = event => {
    console.log(event.target.value)
  }

  successview = () => {
    const {profile} = this.state
    const {shortBio, profileImageUrl, name} = profile
    return (
      <div className="mainContainerJobs">
        <div className="profileAndFilterContainer">
          <div className="profileCard">
            <img
              src={profileImageUrl}
              className="imageprofile"
              alt="profilepic"
            />
            <h1 className="profileName">{name}</h1>
            <p className="profileBio">{shortBio}</p>
          </div>
          <hr className="horizontalline" />
          <h1 className="typeOfEmploy">Type of Employment</h1>
          <ul>
            {employmentTypesList.map(each => (
              <EmploymentType item={each} key={each.employmentTypeId} />
            ))}
          </ul>
          <hr className="horizontalline" />
          <h1 className="typeOfEmploy">Salary Range</h1>
          <form onChange={this.radioChange}>
            {salaryRangesList.map(each => (
              <SalaryRangeItem items={each} key={each.salaryRangeId} />
            ))}
          </form>
        </div>
        <div className="jobsAndSearchCont">
          <h1>shjss</h1>
        </div>
      </div>
    )
  }

  render() {
    const {profile, jobsList} = this.state
    console.log(profile)
    return (
      <div className="mainContainerRender">
        <Header />
        {this.successview()}
      </div>
    )
  }
}
export default Jobs
