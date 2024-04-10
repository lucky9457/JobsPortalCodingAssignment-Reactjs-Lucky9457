import './index.css'

const NotFound = () => (
  <div className="notfoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notfoundimage"
    />
    <h1 className="pagenotfoundHeading">Page Not Found</h1>
    <p className="notfoundDesc">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
