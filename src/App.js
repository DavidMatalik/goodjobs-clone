import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import JobsPage from './pages/JobsPage/JobsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import StartPage from './pages/StartPage/StartPage'

function App() {
  const [fetchedJobs, setFetchedJobs] = useState(null)
  const [jobSearchMatch, setJobSearchMatch] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

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
              setSelectedJob={setSelectedJob}
            />
          }
        />
        <Route
          path='/job-details'
          element={
            <DetailsPage fetchedJobs={fetchedJobs} selectedJob={selectedJob} />
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
