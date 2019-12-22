import React, { useContext } from 'react'
import { shape, string } from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import {
  Container,
  Logo,
  Elements,
  ButtonHeader,
  LandingLink,
} from './Header.module.css'
import { Context } from '../../../App'
import Button from '../Button'

function Header({ location: { pathname } }) {
  const { setUser } = useContext(Context)

  async function handleLogout() {
    await Auth.signOut()
    setUser(false)
  }

  return (
    <div className={Container}>
      <Link to="/">
        <div className={Logo}>SubFollow</div>
      </Link>
      <div className={Elements}>
        {pathname === '/' && (
          <Link to="/login">
            <span className={LandingLink}>Login</span>
          </Link>
        )}
        {pathname === '/login' && (
          <Link to="/signup">
            <Button
              className={ButtonHeader}
              textColor="#f14d38"
              backgroundColor="#fff"
            >
              Sign up
            </Button>
          </Link>
        )}
        {pathname === '/signup' && (
          <Link to="/login">
            <Button
              className={ButtonHeader}
              textColor="#f14d38"
              backgroundColor="#fff"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
}

export default withRouter(Header)
