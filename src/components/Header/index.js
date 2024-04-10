import {Link, withRouter} from 'react-router-dom'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutClick = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <nav className="navbarCont-large">
        <div className="webLogoCont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="webisite logo"
              className="logoWebsite"
            />
          </Link>
        </div>

        <div className="home-jobCont">
          <Link className="link" to="/">
            <p className="nav-item">Home</p>
          </Link>
          <Link className="link" to="/jobs">
            <p className="nav-item">Jobs</p>
          </Link>
        </div>
        <button onClick={logoutClick} type="button" className="buttonLogout">
          Logout
        </button>
      </nav>
      <nav className="nav-cont-mobile">
        <div className="webLogoCont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="webisite logo"
              className="logoWebsiteMobile"
            />
          </Link>
        </div>
        <div className="HomeJobLogoutCont">
          <Link to="/" className="link">
            <IoMdHome className="Homeicon" />
          </Link>
          <Link to="/jobs">
            <BsBriefcaseFill className="Homeicon" />
          </Link>

          <button onClick={logoutClick} type="button" className="logoutIcon">
            {' '}
            <IoIosLogOut className="Homeicon" />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
