import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Header from '../header'
import JobItemCard from '../jobItemCard'
import FailureRender from '../FailureRender'

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

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

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},

    checkBoxValues: [],
    salaryRangeValue: '',
    searchInput: '',
    jobsApiStatus: jobsApiStatusConstants.initial,
    profileApiStatus: jobsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  updateToClientDataFormat = myArray => {
    const updatedData = myArray.map(eachObject => ({
      companyLogoUrl: eachObject.company_logo_url,
      employmentType: eachObject.employment_type,
      jobDescription: eachObject.job_description,
      packagePerAnnum: eachObject.package_per_annum,
      location: eachObject.location,
      rating: eachObject.rating,
      title: eachObject.title,
      id: eachObject.id,
    }))
    return updatedData
  }

  updateProfileData = profileDetails => {
    const updatedData = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    return updatedData
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: jobsApiStatusConstants.loading})
    const url = ' https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileD = this.updateProfileData(data.profile_details)
      this.setState({
        profileDetails: profileD,
        profileApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: jobsApiStatusConstants.failure})
    }
  }
  // https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='

  getJobsList = async () => {
    this.setState({jobsApiStatus: jobsApiStatusConstants.loading})

    const {checkBoxValues, salaryRangeValue, searchInput} = this.state
    console.log(checkBoxValues)

    const employmentTypeValues = checkBoxValues.join(',')
    console.log(employmentTypeValues)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeValues}&minimum_package=${salaryRangeValue}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jobsData = await response.json()
      const jobsUpdatedData = this.updateToClientDataFormat(jobsData.jobs)

      this.setState({
        jobsList: jobsUpdatedData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    const {searchInput} = this.state

    this.setState({searchInput}, this.getJobsList)
  }

  onSubmitEnter = event => {
    if (event.key === 'Enter') {
      this.onSubmitSearchInput()
    }
  }

  getCheckBoxValue = event => {
    const checkedValue = event.target.id
    const {checkBoxValues} = this.state

    const index = checkBoxValues.indexOf(checkedValue)

    if (index !== -1) {
      checkBoxValues.splice(index, 1)
    } else {
      checkBoxValues.push(checkedValue)
    }

    const filteredValues = checkBoxValues
    this.setState({checkBoxValues: filteredValues}, this.getJobsList)
  }

  radioButtonValue = event => {
    event.preventDefault()
    const radioValue = event.target.id
    this.setState({salaryRangeValue: radioValue}, this.getJobsList)
  }

  jobsSuccessViewRender = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="noJobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobsFound-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p>We could not find any jobs</p>
        </div>
      )
    }
    return (
      <ul className="unOrder-list-con">
        {jobsList.map(eachObject => (
          <l1 key={eachObject.id}>
            <JobItemCard jobDetails={eachObject} />
          </l1>
        ))}
      </ul>
    )
  }

  SuccessViewRender = () => this.jobsSuccessViewRender()

  FailureRenderView = () => (
    <div>
      <FailureRender />
      <div>
        <button
          className="retry-button"
          type="button"
          onClick={this.getJobsList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  loaderRenderView = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  profileLoaderRenderView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileSuccessViewRender = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-container">
        <img alt="profile" className="profile-Image" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  profileFailureRenderView = () => (
    <div className="retry-container ">
      <button
        className="retry-button"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  switchingProfileRenderViews = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case jobsApiStatusConstants.success:
        return this.profileSuccessViewRender()
      case jobsApiStatusConstants.loading:
        return this.profileLoaderRenderView()
      case jobsApiStatusConstants.failure:
        return this.profileFailureRenderView()
      default:
        return null
    }
  }

  switchingJobsRenderView = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case jobsApiStatusConstants.success:
        return this.SuccessViewRender()
      case jobsApiStatusConstants.loading:
        return this.loaderRenderView()
      case jobsApiStatusConstants.failure:
        return this.FailureRenderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, salaryRangeValue} = this.state

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-content-container">
          <ul className="profile-sorting-container">
            <li className="search-input-container search-bar-1">
              <input
                type="search"
                className="search-input-style"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                onClick={this.onSubmitSearchInput}
                type="button"
                className="searchIcon-button"
                onKeyDown={this.onSubmitEnter}
                data-testid="searchButton"
              >
                <BiSearch className="search-bar" />
              </button>
            </li>
            <li className="profile-div">
              {this.switchingProfileRenderViews()}
            </li>
            <hr />
            <li className="all-check-box-container">
              <h1 className="type-employment-head">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachObject => (
                  <li
                    className="checkBox-container"
                    onClick={this.OnclickPara}
                    key={eachObject.label}
                    id={eachObject.label}
                  >
                    <nav>
                      <input
                        type="checkbox"
                        id={eachObject.employmentTypeId}
                        value={eachObject.employmentTypeId}
                        onChange={this.getCheckBoxValue}
                      />
                      <label
                        htmlFor={eachObject.employmentTypeId}
                        className="checkbox-label"
                      >
                        {eachObject.label}
                      </label>
                    </nav>
                  </li>
                ))}
              </ul>
            </li>
            <hr />
            <li>
              <h1 className="type-employment-head">Salary Range</h1>
              <form id="radioForm" type="submit">
                <ul>
                  {salaryRangesList.map(eachObject => (
                    <li className="checkBox-container">
                      <input
                        type="radio"
                        id={eachObject.salaryRangeId}
                        name="options"
                        onChange={this.radioButtonValue}
                        value={salaryRangeValue}
                        key={eachObject.salaryRangeId}
                      />
                      <label
                        htmlFor={eachObject.salaryRangeId}
                        className="checkbox-label"
                      >
                        {eachObject.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </form>
            </li>
          </ul>
          <div className="jobs-container">
            <div className="search-input-container search-bar-2">
              <input
                type="search"
                className="search-input-style"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                onKeyDown={this.onSubmitEnter}
              />
              <button
                onClick={this.onSubmitSearchInput}
                type="button"
                className="searchIcon-button"
                data-testid="searchButton"
              >
                <BiSearch className="search-bar" />
              </button>
            </div>
            {this.switchingJobsRenderView()}
          </div>
        </div>
        )
      </div>
    )
  }
}

export default Jobs
