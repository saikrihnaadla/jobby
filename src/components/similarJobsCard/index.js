import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsCard = props => {
  const {similarJob} = props
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,

    jobDescription,
    location,
  } = similarJob

  return (
    <div className="similar-card-container">
      <div className="logo-and-title-container">
        <div>
          <img
            src={companyLogoUrl}
            alt={similarJob.title}
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
      <h1>Description</h1>
      <p className="similarJobs-description">{jobDescription}</p>
      <div>
        <div className="location-items-container">
          <MdLocationOn className="location-icon-similar" />
          <p className="locationStyle-similar">{location}</p>
          <BsBriefcaseFill className="location-icon-similar" />
          <p className="locationStyle-similar">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobsCard
