import Header from '../../components/Header/Header'
import JobResult from '../../components/JobResult/JobResult'
import JobSearch from '../../components/JobSearch/JobSearch'
import './StartPage.scss'

function StartPage({
  setSearchedJobs,
  setJobSearchMatch,
  user,
  loading,
  favoriteJobs,
  jobSearchMatch,
  setSelectedJob,
  setFavoriteJobs,
}) {
  return (
    <div className='start-page'>
      <div className='start-search-top-content'>
        <Header user={user} loading={loading} />
        <section className='start-page-search'>
          <h1>Finde einen Job mit Sinn</h1>
          <h3>Wir bieten dir soziale und nachhaltige Arbeit.</h3>
          <JobSearch
            setSearchedJobs={setSearchedJobs}
            setJobSearchMatch={setJobSearchMatch}
          />
        </section>
      </div>
      {!user && (
        <section className='start-page-no-user'>
          <h2>Das ist GoodJobs</h2>
          <p>
            GoodJobs ist Deutschlands größte Plattform für nachhaltige und
            soziale Jobs. Gemeinsam mit unseren Partnerorganisationen und
            unserer Community möchten wir die Arbeitswelt verändern – weg von
            reinem Profitstreben, hin zu mehr Leidenschaft für das, was zählt:
            Sinnvolles Handeln für den Erhalt unseres Planeten und die Chance
            auf ein gutes Leben für alle!
          </p>
          <h2>Unsere Vision für die Zukunft</h2>
          <p>
            Wir wünschen uns eine Welt, in der alle Menschen mit ihrem GoodJob
            etwas Gutes bewirken und dabei glücklich und zufrieden sind. Eine
            Welt, in der alle Arbeitgeber nachhaltige Unternehmensziele und eine
            wertschätzende Organisationskultur verfolgen.
          </p>
          <h2>Unsere Mission</h2>
          <p>
            Wir möchten zeigen, dass es diese Jobs wirklich gibt und sie kein
            Traum bleiben müssen. Denn für fast jeden “herkömmlichen” Job gibt
            es mittlerweile ein Gegenstück im Themenfeld der Nachhaltigkeit oder
            im sozialen Bereich. Damit alle nachhaltigen und sozialen
            Arbeitgeber ihre positive Wirkung maximieren können, bieten wir
            ihnen eine Plattform und verhelfen ihnen zu den motiviertesten
            Mitarbeiter*innen. Wir informieren und inspirieren unsere Community
            regelmäßig mit Inhalten zu Themen wie New Work, Nachhaltigkeit im
            Job und Zukunft der Arbeit. GoodJobs ist mehr als eine Jobbörse: Wir
            bieten eine Perspektive für eine bessere Zukunft – für Jobsuchende,
            Organisationen und uns alle.
          </p>
        </section>
      )}
      {user && (
        <section className='start-page-favorites'>
          <JobResult
            title='Deine Job-Favoriten'
            user={user}
            jobs={favoriteJobs}
            jobSearchMatch={jobSearchMatch}
            setSelectedJob={setSelectedJob}
            favoriteJobs={favoriteJobs}
            setFavoriteJobs={setFavoriteJobs}
          />
          {favoriteJobs && favoriteJobs.length === 0 && (
            <p className='no-favorites-text'>
              Bisher hast du noch keine Favoriten. Beim Anschauen der Jobs
              kannst du auf das Herz-Symbol klicken. Dadurch speicherst du einen
              Job als Favoriten. Durch nochmaliges Klicken auf das Herz-Symbol
              entfernst du diesen Job wieder von deinen Job-Favoriten.
            </p>
          )}
        </section>
      )}
    </div>
  )
}

export default StartPage
