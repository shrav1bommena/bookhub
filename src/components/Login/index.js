import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

// This is done after publishing the site
// changed desktop left section from img element to div background element
// If it's okay leave it
// or just uncomment the lines that are commented and delete the div desktop left section

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        Username*
      </label>
      <input
        className="input-field"
        id="username"
        type="text"
        placeholder="Username"
        onChange={this.onChangeUsername}
      />
    </>
  )

  renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        Password*
      </label>
      <input
        className="input-field"
        id="password"
        type="password"
        placeholder="Password"
        onChange={this.onChangePassword}
      />
    </>
  )

  renderLoginForm = () => {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-container">
        {/* <img
          className="login-logo-website-desktop-image"
          src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1666082315/Rectangle_1467_pfc0re.png"
          alt="website login"
        /> */}
        <div className="login-desktop-left-section" />
        <div className="login-right-section">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <div className="logo-container">
              <img
                className="login-logo-website-mobile-image"
                src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1666082848/Ellipse_99_jowox5.png"
                alt="website login"
              />
              <img
                className="login-website-logo"
                src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1666082692/Group_7731_h5ogg3.png"
                alt="login website logo"
              />
            </div>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return this.renderLoginForm()
  }
}

export default Login
