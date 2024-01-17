import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../header'
import FailureRender from '../FailureRender'
import SimilarJobsCard from '../similarJobsCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobCompleteDetails: {},
    similarJobsDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  jobDetailsDataConvert = myObject => {
    const UpdatedData = {
      companyLogoUrl: myObject.company_logo_url,
      companyWebsiteUrl: myObject.company_website_url,
      employmentType: myObject.employment_type,
      jobDescription: myObject.job_description,
      id: myObject.id,
      lifeAtCompany: {
        lifeDescription: myObject.life_at_company.description,
        lifeUrl: myObject.life_at_company.image_url,
      },
      location: myObject.location,
      packagePerAnnum: myObject.package_per_annum,
      rating: myObject.rating,
      skills: myObject.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      })),
      title: myObject.title,
    }

    return UpdatedData
  }

  similarJobDataConvert = myArray => {
    const updatedSimilarData = myArray.map(eachObject => ({
      companyLogoUrl: eachObject.company_logo_url,
      employmentType: eachObject.employment_type,
      id: eachObject.id,
      jobDescription: eachObject.job_description,
      location: eachObject.location,
      rating: eachObject.rating,
      title: eachObject.title,
    }))
    return updatedSimilarData
  }

  fetchJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = this.jobDetailsDataConvert(data.job_details)
      const similarJobs = this.similarJobDataConvert(data.similar_jobs)
      this.setState({
        jobCompleteDetails: updatedJobDetails,
        similarJobsDetails: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryDetails = () => {
    this.fetchJobDetails()
  }

  apiStatusSuccessRenderView = () => {
    const {jobCompleteDetails, similarJobsDetails} = this.state

    const {
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      companyLogoUrl,
    } = jobCompleteDetails

    return (
      <div>
        <div className="job-item-details-card-container">
          <div className="job-card-container">
            <div className="logo-and-title-container">
              <div>
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
              </div>
              <div className="only-title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="star-num">
                  <AiFillStar className="star" />
                  <p className="number">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-bg-container">
              <div className="location-items-container">
                <MdLocationOn className="location-icon" />
                <p className="locationStyle">{location}</p>
                <BsBriefcaseFill className="location-icon" />
                <p className="locationStyle">{employmentType}</p>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <div>
              <hr />
              <div className="description-and-visit-container">
                <h1 className="description-heading ">Description</h1>
                <a
                  href={companyWebsiteUrl}
                  target="/blank"
                  className="unText-decoration"
                >
                  <span className="visit-style">Visit</span>
                  <FiExternalLink className="visit-style" />
                </a>
              </div>

              <p className="description">{jobDescription}</p>
            </div>
            <div className="skills-main-bg-container">
              <h1 className="skills-heading-style">Skills</h1>
              <ul className="skills-bg-container">
                {skills.map(eachSkill => (
                  <li key={eachSkill.name}>
                    <div className="eachSkill-container">
                      <img
                        src={eachSkill.imageUrl}
                        alt={eachSkill.name}
                        className="skills-image"
                      />
                      <h1 className="skill-heading-style">{eachSkill.name}</h1>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="life-at-company-style"> Life at Company</h1>
              <div className="life-at-company-bg-container">
                <p>{lifeAtCompany.lifeDescription}</p>
                <img src={lifeAtCompany.lifeUrl} alt="life at company" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul className="similarCards-container">
            {similarJobsDetails.map(eachItem => (
              <li key={eachItem.id}>
                <SimilarJobsCard similarJob={eachItem} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  apiStatusFailureRenderView = () => (
    <div className="failure-bg-container">
      <FailureRender />
      <div>
        <button
          onClick={this.onClickRetryDetails}
          type="button"
          className="failure-retry-button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  apiStatusLoadingView = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  switchingViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.apiStatusSuccessRenderView()
      case apiStatusConstants.failure:
        return this.apiStatusFailureRenderView()
      case apiStatusConstants.loading:
        return this.apiStatusLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="JobDetails-bg-Container">{this.switchingViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
