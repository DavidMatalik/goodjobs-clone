import Header from '../../components/Header/Header'
import JobResult from '../../components/JobResult/JobResult'
import JobSearch from '../../components/JobSearch/JobSearch'
import './JobsPage.scss'

function JobsPage({
  searchedJobs,
  setSearchedJobs,
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
          setSearchedJobs={setSearchedJobs}
          setJobSearchMatch={setJobSearchMatch}
        />
      </section>
      <JobResult
        title='Job-Ergebnisse'
        user={user}
        jobs={searchedJobs}
        jobSearchMatch={jobSearchMatch}
        setSelectedJob={setSelectedJob}
        favoriteJobs={favoriteJobs}
        setFavoriteJobs={setFavoriteJobs}
      />
    </div>
  )
}

export default JobsPage
