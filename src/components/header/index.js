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
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="header-list-container">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-logo"
            />
          </Link>
        </li>
        <li>
          <div className="header-heads-container">
            <div>
              <Link to="/" className="unText-decoration">
                <p className="header-heads-text">Home</p>
                <AiFillHome className="mobileView-icons" />
              </Link>
            </div>
            <div>
              <Link to="/jobs" className="unText-decoration">
                <p className="header-heads-text">Jobs</p>
                <BsBriefcaseFill className="mobileView-icons" />
              </Link>
            </div>
          </div>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
