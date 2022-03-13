import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllJobs, getMatchingJobs } from '../../services/services'
import GoodjobsButton from '../GoodjobsButton/GoodjobsButton'
import './JobSearch.scss'

function JobSearch({ setFetchedJobs, setJobSearchMatch }) {
  const navigate = useNavigate()
  const location = useLocation()

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
    },
    onSubmit: async (values) => {
      if (location !== '/jobs') {
        navigate('/jobs')
      }

      const matchingJobs = await getMatchingJobs(values.jobTitle)

      if (matchingJobs.length >= 1) {
        setJobSearchMatch(true)
        return setFetchedJobs(matchingJobs)
      } else {
        setJobSearchMatch(false)
        return setFetchedJobs(await getAllJobs())
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        className='job-input-field'
        name='jobTitle'
        label='Jobtitel'
        variant='standard'
        value={formik.values.jobTitle}
        onChange={formik.handleChange}
      />
      <div className='search-button-wrapper'>
        <GoodjobsButton theme='black' type='submit'>
          Jobs finden
        </GoodjobsButton>
      </div>
    </form>
  )
}

export default JobSearch
