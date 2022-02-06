import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import './JobSearch.scss'

function JobSearch({ buttonTheme = 'light' }) {
  const formik = useFormik({
    initialValues: {
      jobTitle: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
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
      <Button
        className={`job-search-button button-dark ${
          buttonTheme === 'dark' ? 'button-dark' : ''
        }`}
        variant='outlined'
        type='submit'
      >
        Jobs finden
      </Button>
    </form>
  )
}

export default JobSearch
