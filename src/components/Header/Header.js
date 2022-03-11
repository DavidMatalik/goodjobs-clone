import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import goodjobsLogo from '../../img/goodjobs-logo.svg'
import { signOutUser } from '../../services/services'
import './Header.scss'

function Header({ user, loading }) {
  const [userPart, setUserPart] = useState('')

  useEffect(() => {
    if (loading === false && user) {
      setUserPart(
        <p
          className='header-logout'
          onClick={() => {
            signOutUser()
            toast('Tschüss, bis bald!', {
              position: toast.POSITION.TOP_CENTER,
            })
          }}
        >
          Logout
        </p>
      )
    }
    if (loading === false && !user) {
      setUserPart(
        <Link className='header-login' to='/login'>
          Login
        </Link>
      )
    }
  }, [loading, user])

  return (
    <header>
      <nav>
        <Link to='/'>
          <img src={goodjobsLogo} alt='goodjobs logo'></img>
        </Link>
        <Link className='header-jobs-link' to='/jobs'>
          Jobs
        </Link>
      </nav>
      <div>{userPart}</div>
    </header>
  )
}

export default Header
