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
  favoriteJobs,
  setFavoriteJobs,
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
        title='Job-Ergebnisse'
        user={user}
        jobs={fetchedJobs}
        jobSearchMatch={jobSearchMatch}
        setSelectedJob={setSelectedJob}
        favoriteJobs={favoriteJobs}
        setFavoriteJobs={setFavoriteJobs}
      />
    </div>
  )
}

export default JobsPage
