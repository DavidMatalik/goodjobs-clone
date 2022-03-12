import Header from '../../components/Header/Header'
import JobResult from '../../components/JobResult/JobResult'
import JobSearch from '../../components/JobSearch/JobSearch'
import './StartPage.scss'

function StartPage({
  setFetchedJobs,
  setJobSearchMatch,
  user,
  loading,
  favoriteJobs,
  jobSearchMatch,
  setSelectedJob,
}) {
  return (
    <div className='start-page'>
      <div className='start-search-top-content'>
        <Header user={user} loading={loading} />
        <section className='start-page-search'>
          <h1>Finde einen Job mit Sinn</h1>
          <h3>Wir bieten dir soziale und nachhaltige Arbeit.</h3>
          <JobSearch
            setFetchedJobs={setFetchedJobs}
            setJobSearchMatch={setJobSearchMatch}
          />
        </section>
      </div>
      <section className='start-page-favorites'>
        <JobResult
          title='Deine Job-Favoriten'
          jobs={favoriteJobs}
          jobSearchMatch={jobSearchMatch}
          setSelectedJob={setSelectedJob}
        />
        {favoriteJobs && favoriteJobs.length === 0 && (
          <p className='no-favorites-text'>
            Bisher hast du noch keine Favoriten. Beim Anschauen der Jobs kannst
            du auf das Herz-Symbol klicken. Dadurch speicherst du einen Job als
            Favoriten. Durch nochmaliges Klicken auf das Herz-Symbol entfernst
            du diesen Job wieder von deinen Job-Favoriten.
          </p>
        )}
      </section>
    </div>
  )
}

export default StartPage
