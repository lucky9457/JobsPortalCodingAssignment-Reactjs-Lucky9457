import {Link, withRouter} from 'react-router-dom'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const a = 'a'
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
          <p className="nav-item">Home</p>
          <p className="nav-item">Jobs</p>
        </div>
        <button type="button" className="buttonLogout">
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
          <IoMdHome className="Homeicon" />
          <BsBriefcaseFill className="Homeicon" />
          <IoIosLogOut className="Homeicon" />
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
