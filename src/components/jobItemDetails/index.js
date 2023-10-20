import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../header'

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, similarJobsDetails: []}

  componentDidMount() {
    this.fetchJobDetails()
  }

  jobDetailsDataConvert = myObject => {
    const UpdatedData = {
      companyLogoUrl: myObject.company_logo_url,
      companyWebsiteUrl: myObject.company_website_url,
      employmentType: myObject.employment_type,
      id: myObject.id,
      jobDescription: myObject.job_description,
      lifeAtCompany: myObject.life_at_company,
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
      const updatedSimilarJobsData = this.similarJobDataConvert(
        data.similar_jobs,
      )
      console.log(data)
      this.setState({similarJobsDetails: updatedSimilarJobsData})
      this.setState({jobItemDetails: updatedJobDetails})
    }
  }

  render() {
    const {jobItemDetails, similarJobsDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobItemDetails

    return (
      <>
        <Header />
        <div className="JobDetails-bg-Container">
          <div className="job-item-details-card-container">
            <div className="job-card-container">
              <div className="logo-and-title-container">
                <div>
                  <img
                    src={companyLogoUrl}
                    alt={title}
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
                <h1 className="package">{packagePerAnnum}</h1>
              </div>
              <div>
                <hr />
                <h1 className="description-heading ">Description</h1>
                <p className="description">{jobDescription}</p>
              </div>
              <h1>Skills</h1>
              <ul>
                {skills.map(eachSkill => (
                  <l>{eachSkill.name}</l>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
