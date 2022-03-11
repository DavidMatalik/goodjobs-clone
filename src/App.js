import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import JobsPage from './pages/JobsPage/JobsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import StartPage from './pages/StartPage/StartPage'
import { addUserChangeListener } from './services/services'

function App() {
  const [fetchedJobs, setFetchedJobs] = useState(null)
  const [jobSearchMatch, setJobSearchMatch] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    addUserChangeListener(user, setUser, setLoading)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <StartPage
              loading={loading}
              user={user}
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
        <Route
          path='/login'
          element={
            user ? <Navigate replace to='/' /> : <LoginPage setUser={setUser} />
          }
        />
        <Route
          path='/register'
          element={
            user ? (
              <Navigate replace to='/' />
            ) : (
              <RegistrationPage setUser={setUser} />
            )
          }
        />
        <Route
          path='/reset-password'
          element={user ? <Navigate replace to='/' /> : <ResetPasswordPage />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
