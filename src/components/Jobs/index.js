import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import Header from '../Header'
import SalaryRangeItem from '../SalaryRangeItem'
import EmploymentType from '../EmploymentType'
import JobItem from '../JobItem'

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
    checkboxList: [],
    radioVal: '',
    searchVal: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getjobs()
  }

  retryJobFailure = () => {
    this.getjobs()
  }

  retryBtnClick = () => {
    this.getProfile()
  }

  profileFailureView = () => (
    <div className="profileCardFailure">
      <button
        onClick={this.retryBtnClick}
        type="button"
        className="profileRetryOnFailure"
      >
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

  renderLoadingView = () => (
    <div className="profileCardFailure">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  checkprofileStatus = () => {
    const {profileapi} = this.state
    switch (profileapi) {
      case profileapistatus.success:
        return this.profileSuccess()
      case profileapistatus.loading:
        return this.renderLoadingView()
      case profileapistatus.failure:
        return this.profileFailureView()

      default:
        return null
    }
  }

  getjobs = async () => {
    const {checkboxList, radioVal, searchVal} = this.state
    let Filterlistval
    if (checkboxList.length === 0) {
      Filterlistval = ''
    } else {
      Filterlistval = checkboxList.join(',')
    }

    console.log(Filterlistval)
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
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${Filterlistval}&minimum_package=${radioVal}&search=${searchVal}`,
      options,
    )
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
    this.setState(
      {
        radioVal: event.target.value,
      },
      this.getjobs,
    )
  }

  searchValueChange = event => {
    this.setState(
      {
        searchVal: event.target.value,
      },
      this.getjobs,
    )
  }

  searchData = () => {
    this.getjobs()
  }

  changesCheck = (val, employType) => {
    console.log(val, employType)
    const {checkboxList} = this.state

    let list = [...checkboxList]
    if (val) {
      list.push(employType)
      this.setState(
        {
          checkboxList: [...list],
        },
        this.getjobs,
      )
    } else {
      list = list.filter(each => each !== employType)
      this.setState(
        {
          checkboxList: [...list],
        },
        this.getjobs,
      )
    }
  }

  profileSuccess = () => {
    const {profile} = this.state
    const {shortBio, profileImageUrl, name} = profile
    return (
      <div className="profileCard">
        <img src={profileImageUrl} className="imageprofile" alt="profilepic" />
        <h1 className="profileName">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  joblistSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="nojobCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="noJobsImage"
          />
          <h1 className="nojobheading">No Jobs Found</h1>
          <p className="descNojob">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="containerJobslist">
        {jobsList.map(each => (
          <JobItem key={each.id} jobitem={each} />
        ))}
      </ul>
    )
  }

  renderJobFailureView = () => (
    <div className="failureCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureviewimage"
      />
      <h1 className="failureHead">Oops! Something Went Wrong</h1>
      <p className="descFailure">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.retryJobFailure} type="button" className="btnRetry">
        Retry
      </button>
    </div>
  )

  renderJobsLoading = () => (
    <div className="jobsLoadingView">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  checkJoblistStatus = () => {
    const {jobstat} = this.state
    switch (jobstat) {
      case jobsapi.failure:
        return this.renderJobFailureView()
      case jobsapi.loading:
        return this.renderJobsLoading()
      case jobsapi.success:
        return this.joblistSuccessView()
      default:
        return null
    }
  }

  successview = () => (
    <div className="mainContainerJobs">
      <div className="profileAndFilterContainer">
        <div className="searchCont-Mobile">
          <input
            onChange={this.searchValueChange}
            type="search"
            className="searchInput"
            id="search"
          />
          <button
            onClick={this.searchData}
            type="button"
            className="searchIconBtn"
          >
            {' '}
            <IoSearch className="searchicon" />
          </button>
        </div>
        {this.checkprofileStatus()}
        <hr className="horizontalline" />
        <h1 className="typeOfEmploy">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <EmploymentType
              item={each}
              checkedChange={this.changesCheck}
              key={each.employmentTypeId}
            />
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
        <div className="searchCont">
          <input
            onChange={this.searchValueChange}
            type="search"
            className="searchInput"
            id="search"
          />
          <button
            onClick={this.searchData}
            type="button"
            className="searchIconBtn"
          >
            {' '}
            <IoSearch className="searchicon" />
          </button>
        </div>
        {this.checkJoblistStatus()}
      </div>
    </div>
  )

  render() {
    return (
      <div className="mainContainerRender">
        <Header />
        {this.successview()}
      </div>
    )
  }
}
export default Jobs
