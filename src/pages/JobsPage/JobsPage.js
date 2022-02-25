import Header from '../../components/Header/Header'
import JobResult from '../../components/JobResult/JobResult'
import JobSearch from '../../components/JobSearch/JobSearch'
import './JobsPage.scss'

function JobsPage({
  fetchedJobs,
  setFetchedJobs,
  jobSearchMatch,
  setJobSearchMatch,
}) {

  console.log("In JobsPage fetchedJobs", fetchedJobs)
  return (
    <main className='jobs-page-content'>
      <Header />
      <section className='job-search'>
        <h1>Such dich glücklich mit GoodJobs!</h1>
        <JobSearch
          setFetchedJobs={setFetchedJobs}
          setJobSearchMatch={setJobSearchMatch}
        />
      </section>
      <JobResult fetchedJobs={fetchedJobs} jobSearchMatch={jobSearchMatch}/>
    </main>
  )
}

export default JobsPage
