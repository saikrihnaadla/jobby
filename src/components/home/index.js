import './index.css'
import {Link} from 'react-router-dom'
import Header from '../header'

const Home = () => (
  <div className="Home-bg">
    <Header />
    <div className="home-content-bg">
      <div className="homepage-heads-para-container">
        <h1 className="find-jobs-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-para">
          Millions of people are searching for jobs,salary, information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="find-jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
