import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import JobsPage from './pages/JobsPage/JobsPage'
import StartPage from './pages/StartPage/StartPage'

function App() {
  const [fetchedJobs, setFetchedJobs] = useState(null)
  const [jobSearchMatch, setJobSearchMatch] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <StartPage
              setFetchedJobs={setFetchedJobs}
              setJobSearchMatch={setJobSearchMatch}
            />
          }
        />
        <Route
          path='/jobs'
          element={
            <JobsPage
              fetchedJobs={fetchedJobs}
              setFetchedJobs={setFetchedJobs}
              jobSearchMatch={jobSearchMatch}
              setJobSearchMatch={setJobSearchMatch}
            />
          }
        />
        <Route path='/job-details' element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
