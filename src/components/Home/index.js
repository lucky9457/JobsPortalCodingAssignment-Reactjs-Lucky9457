import './index.css'
import Header from '../Header'

const Home = () => {
  const a = 'a'
  return (
    <div className="HomeCont">
      <Header />
      <div className="HomeDataCont">
        <h1 className="homeHead">Find The Job That Fits Your Life</h1>
        <p className="homeDescription">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that best fits your abilities and
          potential
        </p>
        <button type="button" className="findJobBtn">
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
