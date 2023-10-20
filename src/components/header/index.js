import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }
  const OnclickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="login-logo-style"
        onClick={OnclickLogo}
      />
      <div className="header-heads-container">
        <div className="home-jobs">
          <Link to="/">
            <h1 className="header-heads-text">Home</h1>
            <AiFillHome className="mobileView-icons" />
          </Link>
          <Link to="/jobs">
            <h1 className="header-heads-text">Jobs</h1>
            <BsBriefcaseFill className="mobileView-icons" />
          </Link>
        </div>
        <div>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
          <FiLogOut className="mobileView-icons" onClick={onClickLogout} />
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
