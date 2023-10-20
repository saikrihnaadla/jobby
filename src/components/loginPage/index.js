import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        showSubmitError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg, showSubmitError} = this.state
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <form>
            <div className="login-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="logo"
                className="login-logo-style"
              />
            </div>
            <div>
              <h1>USERNAME</h1>
              <input
                type="input"
                className="login-input-style"
                placeholder="UserName"
                value={username}
                onChange={this.onChangeUserName}
              />
              <h1>PASSWORD</h1>
              <input
                type="input"
                className="login-input-style"
                placeholder="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="login-button-style"
                onClick={this.onSubmitLogin}
              >
                Login
              </button>
            </div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
