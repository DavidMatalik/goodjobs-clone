import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import JobsPage from './pages/JobsPage/JobsPage'
import StartPage from './pages/StartPage/StartPage'

function App() {
  const [fetchedJobs, setFetchedJobs] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<StartPage setFetchedJobs={setFetchedJobs} />}
        />
        <Route path='/jobs' element={<JobsPage fetchedJobs={fetchedJobs} />} />
        <Route path='/job-details' element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
