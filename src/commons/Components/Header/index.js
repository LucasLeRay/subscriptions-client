import React, { useContext } from 'react'
import { shape, string } from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { Container, Logo, Elements } from './Header.module.css'
import { Context } from '../../../App'
import Button from '../Button'

function Header({ location: { pathname } }) {
  const { user, setUser } = useContext(Context)

  async function handleLogout() {
    await Auth.signOut()
    setUser(false)
  }

  return (
    <div className={Container}>
      <div className={Logo}>SubFollow</div>
      <div className={Elements}>
        {user ? (
          <Button onClick={handleLogout}>Log out</Button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
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
