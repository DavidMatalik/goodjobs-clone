import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import GoodjobsButton from '../../components/GoodjobsButton/GoodjobsButton'
import goodJobsLogo from '../../img/goodjobs-logo.svg'
import { registerNewUser } from '../../services/services'
import './RegistrationPage.scss'

function RegistrationPage({ setUser }) {
  const registerSchema = Yup.object({
    email: Yup.string().email('Ungültige E-Mail').required('E-Mail benötigt'),
    password: Yup.string()
      .required('Passwort benötigt')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Muss 8 Zeichen, einen Großbuchstabe, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwörter müssen gleich sein'
    ),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      registerNewUser(values.email, values.password)
        .then(() => {
          toast('Dein Account wurde erfolgreich angelegt!', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
        .catch(() => {
          resetForm()
          toast.error(
            'Leider gab es einen Fehler bei deinem Registrations-Versuch',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          )
        })
    },
  })

  return (
    <main className='registration-page'>
      <Link to='/'>
        <img src={goodJobsLogo} alt='goodjobs-logo' />
      </Link>
      <h1>Wir freuen uns auf dich. Registrier dich jetzt.</h1>
      <form className='registration-form' onSubmit={formik.handleSubmit}>
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
        <TextField
          className='password-input-field'
          name='password'
          label='Passwort'
          variant='standard'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          className='confirm-password-input-field'
          name='confirmPassword'
          label='Passwort bestätigen'
          variant='standard'
          type='password'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <GoodjobsButton theme='black' type='submit'>
          Register
        </GoodjobsButton>
      </form>
    </main>
  )
}

export default RegistrationPage
