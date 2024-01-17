import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="unText-decoration">
      <div className="unText-decoration">
        <div className="job-card-container">
          <div className="logo-and-title-container">
            <div>
              <img
                src={companyLogoUrl}
                alt="company logo"
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
            <h1 className="description">{jobDescription}</h1>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobItemCard
