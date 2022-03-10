import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import GoodjobsButton from '../../components/GoodjobsButton/GoodjobsButton'
import githubLogoBlack from '../../img/github-logo-black.svg'
import githubLogoWhite from '../../img/github-logo-white.svg'
import goodJobsLogo from '../../img/goodjobs-logo.svg'
import {
  getUserInformation,
  loginUserWithGithub,
  registerNewUser,
} from '../../services/services'
import './LoginPage.scss'

function LoginPage() {
  const navigate = useNavigate()
  const [githubLogo, setGithubLogo] = useState(githubLogoBlack)

  useEffect(() => {
    getUserInformation()
  })

  const loginSchema = Yup.object({
    email: Yup.string().email('Ungültige E-Mail').required('E-Mail benötigt'),
    password: Yup.string()
      .required('Passwort benötigt')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Muss 8 Zeichen, einen Großbuchstabe, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
      ),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      registerNewUser(values.email, values.password)
      navigate('/')
    },
  })

  return (
    <main className='login-page'>
      <Link to='/'>
        <img src={goodJobsLogo} alt='goodjobs-logo' />
      </Link>
      <h1>
        Willkommen zurück. <br /> Log dich ein.
      </h1>
      <div className='register-hint'>
        <p>Noch keinen goodJobs Account?</p>
        <Link to='/register'>Registrier dich jetzt</Link>
      </div>
      <form className='login-form' onSubmit={formik.handleSubmit}>
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
        <GoodjobsButton theme='black' width='250px' type='submit'>
          Login
        </GoodjobsButton>
        <div
          className='github-button-wrapper'
          onMouseEnter={() => setGithubLogo(githubLogoWhite)}
          onMouseLeave={() => setGithubLogo(githubLogoBlack)}
        >
          <GoodjobsButton
            theme='black'
            width='250px'
            type='button'
            onClick={loginUserWithGithub}
          >
            <img className='github-logo' src={githubLogo} alt='Github Logo' />
            Login with Github
          </GoodjobsButton>
        </div>
      </form>
      <Link to='/reset-password'>Passwort vergessen?</Link>
    </main>
  )
}

export default LoginPage
