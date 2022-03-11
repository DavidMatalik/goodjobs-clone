import Header from '../../components/Header/Header'
import JobResult from '../../components/JobResult/JobResult'
import JobSearch from '../../components/JobSearch/JobSearch'
import './JobsPage.scss'

function JobsPage({
  fetchedJobs,
  setFetchedJobs,
  jobSearchMatch,
  setJobSearchMatch,
  setSelectedJob,
  user,
  loading,
}) {
  return (
    <div className='jobs-page'>
      <Header user={user} loading={loading} />
      <section className='job-search'>
        <h1>Such dich glücklich mit GoodJobs!</h1>
        <JobSearch
          setFetchedJobs={setFetchedJobs}
          setJobSearchMatch={setJobSearchMatch}
        />
      </section>
      <JobResult
        fetchedJobs={fetchedJobs}
        jobSearchMatch={jobSearchMatch}
        setSelectedJob={setSelectedJob}
      />
    </div>
  )
}

export default JobsPage
