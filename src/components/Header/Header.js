import { Link } from 'react-router-dom'
import goodjobsLogo from '../../img/goodjobs-logo.svg'
import './Header.scss'

function Header({ user }) {
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
      {user ? null : (
        <Link className='header-login' to='/login'>
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
