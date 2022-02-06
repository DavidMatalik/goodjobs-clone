import Header from '../../components/Header/Header'
import JobSearch from '../../components/JobSearch/JobSearch'
import './StartPage.scss'

function StartPage() {
  return (
    <>
      <Header />
      <main>
        <h1>Finde einen Job mit Sinn</h1>
        <h3>Wir bieten dir soziale und nachhaltige Arbeit.</h3>
        <JobSearch />
      </main>
    </>
  )
}

export default StartPage
