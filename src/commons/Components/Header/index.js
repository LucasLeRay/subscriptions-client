import React, { useContext, useState } from 'react'
import { shape, string } from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import {
  Container,
  LogoWrapper,
  Elements,
  ButtonHeader,
  NoFrameLink,
  LogoutText,
  LogoutIcon,
} from './Header.module.css'
import { Context } from '../../../App'
import Button from '../Button'
import Icon from '../Icon'
import Modal from '../Modal'
import CreateSubscription from '../CreateSubscription'
import { ReactComponent as Logo } from './logo.svg'

function Header({ location: { pathname } }) {
  const { user, setUser } = useContext(Context)
  const [createSubscription, setCreateSubscription] = useState(false)

  async function handleLogout() {
    await Auth.signOut()
    setUser(false)
  }

  return (
    <div className={Container}>
      {createSubscription && (
        <Modal onClickOutSide={() => setCreateSubscription(false)}>
          <CreateSubscription
            onSuccess={() => window.location.reload()}
            onCancel={() => setCreateSubscription(false)}
          />
        </Modal>
      )}
      <Link to="/">
        <div className={LogoWrapper}>
          <Logo />
        </div>
      </Link>
      <div className={Elements}>
        {pathname === '/' && !user && (
          <Link to="/login">
            <span className={NoFrameLink}>Login</span>
          </Link>
        )}
        {user && (
          <>
            <Button
              className={ButtonHeader}
              onClick={() => setCreateSubscription(true)}
              textColor="#f14d38"
              backgroundColor="#fff"
            >
              New Subscription
            </Button>
            <span onClick={handleLogout} className={NoFrameLink}>
              <Icon className={LogoutIcon}>power_settings_new</Icon>
              <span className={LogoutText}>Logout</span>
            </span>
          </>
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
