import Header from '../../components/Header/Header'
import JobSearch from '../../components/JobSearch/JobSearch'
import lumenazaLogo from '../../img/lumenaza-logo.png'
import './JobsPage.scss'

function JobsPage({
  fetchedJobs,
  setFetchedJobs,
  jobSearchMatch,
  setJobSearchMatch,
}) {
  const getJobActuality = (creationDate) => {
    const diffInSeconds = Date.now() / 1000 - new Date(creationDate)

    const diffInHours = Math.round(diffInSeconds / (60 * 60))
    if (diffInHours <= 24) {
      return `${diffInHours} Stunde${diffInHours !== 1 ? 'n' : ''}`
    }

    const diffInDays = Math.round(diffInSeconds / (60 * 60 * 24))
    if (diffInDays < 7) {
      return `${diffInDays} Tag${diffInDays !== 1 ? 'en' : ''}`
    }

    const diffInWeeks = Math.round(diffInSeconds / (60 * 60 * 24 * 7))
    if (diffInWeeks < 4) {
      return `${diffInWeeks} Woche${diffInWeeks !== 1 ? 'n' : ''}`
    }

    const diffInMonths = Math.round(diffInSeconds / (60 * 60 * 24 * 30))
    return `${diffInMonths} Monat${diffInMonths !== 1 ? 'en' : ''}`
  }

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
      <section className='job-results'>
        {jobSearchMatch ? (
          <p className='job-counter'>
            {fetchedJobs && `${fetchedJobs.length} Ergebnis`}
            {fetchedJobs && fetchedJobs.length !== 1 ? 'se' : ''}
          </p>
        ) : (
          <p className='no-matches'>
            Wir konnten leider keine passenden Jobs für dich finden. Aber
            vielleicht ist einer dieser Jobs interessant?
          </p>
        )}
        {fetchedJobs &&
          fetchedJobs.map((job) => {
            return (
              <div className='job-result' key={job.id}>
                <img src={lumenazaLogo} alt='Logo' />
                <div className='job-description'>
                  <p className='job-place'>
                    {fetchedJobs && job.place}
                    {fetchedJobs && job.remote ? ' | Remote möglich' : ''}
                  </p>
                  <h3>{fetchedJobs && job.title}</h3>
                  <p className='job-company'>
                    {fetchedJobs && job.company.name}
                  </p>
                  <p className='job-age'>
                    vor{' '}
                    {fetchedJobs && getJobActuality(job.creationDate.seconds)}
                  </p>
                </div>
              </div>
            )
          })}
      </section>
    </main>
  )
}

export default JobsPage
