import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import goodJobsLogo from '../../img/goodjobs-logo.svg'
import { sendResetEmail } from '../../services/services'
import './ResetPasswordPage.scss'

function ResetPasswordPage() {
  const navigate = useNavigate()

  const loginSchema = Yup.object({
    email: Yup.string().email('Ungültige E-Mail').required('E-Mail benötigt'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      sendResetEmail(values.email).then((res) => {
        if (res instanceof Error) {
          toast.error('Angegebene E-Mail ist nicht hinterlegt', {
            position: toast.POSITION.TOP_CENTER,
          })()
        } else {
          navigate('/login')
          toast('E-Mail zum Passwort zurücksetzen gesendet!', {
            position: toast.POSITION.TOP_CENTER,
          })()
        }
      })
    },
  })

  return (
    <main className='reset-page'>
      <Link to='/'>
        <img src={goodJobsLogo} alt='goodjobs-logo' />
      </Link>
      <h1>
        Bitte gib die E-Mail Adresse deines Accounts an. Wir werden dir per
        E-Mail Informationen zusenden, wie du dein Passwort zurücksetzen kannst.
      </h1>
      <form className='reset-form' onSubmit={formik.handleSubmit}>
        <TextField
          className='email-input-field'
          name='email'
          label='E-Mail'
          variant='standard'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          className='reset-button button-dark'
          variant='outlined'
          type='submit'
        >
          Passwort zurücksetzen
        </Button>
      </form>
    </main>
  )
}

export default ResetPasswordPage
