import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="HomeCont">
    <Header />
    <div className="HomeDataCont">
      <h1 className="homeHead">Find The Job That Fits Your Life</h1>
      <p className="homeDescription">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the job that best fits your abilities and potential
      </p>
      <Link className="link" to="/jobs">
        <button type="button" className="findJobBtn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
