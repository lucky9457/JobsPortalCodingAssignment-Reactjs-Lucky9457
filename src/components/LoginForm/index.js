import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorLogin: false}

  submitUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    console.log(response)
    if (response.ok) {
      const token = await response.json()
      const jwt = token.jwt_token
      Cookies.set('jwt_token', jwt, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        errorLogin: true,
      })
    }
  }

  UsernameEntered = event => {
    this.setState({
      username: event.target.value,
    })
  }

  passwordEntered = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {errorLogin} = this.state
    return (
      <div className="LoginContainer">
        <div className="logincard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logoWebsite"
          />
          <form onSubmit={this.submitUser} className="formCont">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              onChange={this.UsernameEntered}
              placeholder="Username"
              id="username"
              className="inputName"
              type="text"
            />
            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              onChange={this.passwordEntered}
              placeholder="Password"
              id="password"
              className="inputName"
              type="password"
            />
            <br />
            <button type="submit" className="loginBtn">
              Login
            </button>
            {errorLogin && (
              <p className="errorPara">*Username and Password didn't match</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
