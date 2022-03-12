import { CircularProgress } from '@mui/material'
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
  const [favoriteJobs, setFavoriteJobs] = useState(null)

  useEffect(() => {
    addUserChangeListener(setUser, setLoading)
  }, [user])

  const handleLoading = (component) => {
    if (loading) {
      return (
        <div className='loading-spinner-wrapper'>
          <CircularProgress />
        </div>
      )
    } else if (user) {
      return <Navigate replace to='/' />
    } else {
      return component
    }
  }

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
              favoriteJobs={favoriteJobs}
              setFavoriteJobs={setFavoriteJobs}
              jobSearchMatch={jobSearchMatch}
              setSelectedJob={setSelectedJob}
            />
          }
        />
        <Route
          path='/jobs'
          element={
            <JobsPage
              loading={loading}
              user={user}
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
            <DetailsPage
              loading={loading}
              user={user}
              fetchedJobs={fetchedJobs}
              selectedJob={selectedJob}
              favoriteJobs={favoriteJobs}
              setFavoriteJobs={setFavoriteJobs}
            />
          }
        />
        <Route
          path='/login'
          element={handleLoading(<LoginPage setUser={setUser} />)}
        />
        <Route
          path='/register'
          element={handleLoading(<RegistrationPage setUser={setUser} />)}
        />
        <Route
          path='/reset-password'
          element={handleLoading(<ResetPasswordPage />)}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
