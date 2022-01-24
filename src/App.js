import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import JobsPage from './pages/JobsPage/JobsPage'
import StartPage from './pages/StartPage/StartPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/job-details' element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
