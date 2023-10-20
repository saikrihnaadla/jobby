import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Header from '../header'
import JobItemCard from '../jobItemCard'

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
    isProfileSuccess: false,
    checkBoxValues: [],
    salaryRangeValue: '',
    searchInput: '',
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
      this.setState({profileDetails: profileD, isProfileSuccess: true})
    } else {
      this.setState({isProfileSuccess: false})
    }
  }
  // https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='

  getJobsList = async () => {
    const {checkBoxValues, salaryRangeValue, searchInput} = this.state
    const emplyomentTypeValues = checkBoxValues.join(',')
    console.log(emplyomentTypeValues)
    const url = `https://apis.ccbp.in/jobs?employment_type=${emplyomentTypeValues}&minimum_package=${salaryRangeValue}&search=${searchInput}`
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

      this.setState({jobsList: jobsUpdatedData})
    } else {
      console.log('error')
    }
  }

  getCheckBoxValue = event => {
    const {checkBoxValues} = this.state
    const checkedValue = event.target.id

    const notInValues = checkBoxValues.filter(
      eachItem => eachItem !== checkedValue,
    )

    if (notInValues.length === 0) {
      this.setState(
        prevState => ({
          checkBoxValues: [...prevState.checkBoxValues, notInValues],
        }),
        this.getJobsList,
      )
    } else {
      const filteredData = checkBoxValues.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkBoxValues: filteredData}, this.getJobsList)
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

  render() {
    const {jobsList, profileDetails, isProfileSuccess, searchInput} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-content-container">
          <div className="profile-sorting-container">
            <div className="search-input-container search-bar-1">
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
              >
                <BiSearch className="search-bar" />
              </button>
            </div>
            {isProfileSuccess && (
              <div className="profile-bg-container">
                <img
                  alt="profile"
                  className="profile-Image"
                  src={profileImageUrl}
                />
                <h1>{name}</h1>
                <p>{shortBio}</p>
              </div>
            )}
            {!isProfileSuccess && (
              <div className="retry-container ">
                <button
                  className="retry-button"
                  type="button"
                  onClick={this.getProfileDetails}
                >
                  Retry
                </button>
              </div>
            )}

            <hr />
            <div className="all-check-box-container">
              <h1 className="type-employment-head">Type of Employment</h1>
              {employmentTypesList.map(eachObject => (
                <div className="checkBox-container">
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
                </div>
              ))}
            </div>
            <hr />
            <div>
              <h1 className="type-employment-head">Salary Range</h1>
              <form id="radioForm">
                {salaryRangesList.map(eachObject => (
                  <div className="checkBox-container">
                    <input
                      type="radio"
                      id={eachObject.salaryRangeId}
                      name="options"
                      onChange={this.getRadioButtonValue}
                    />
                    <label htmlFor="10Lpa" className="checkbox-label">
                      {eachObject.label}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
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
              >
                <BiSearch className="search-bar" />
              </button>
            </div>
            <ul className="unOrder-list-con">
              {jobsList.map(eachObject => (
                <JobItemCard jobDetails={eachObject} key={eachObject.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
