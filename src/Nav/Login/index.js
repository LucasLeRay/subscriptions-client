import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { shape, func } from 'prop-types'
import Input from '../../commons/Components/Input'
import Button from '../../commons/Components/Button'
import WaveBackground from '../../commons/Components/WaveBackground'
import {
  Container,
  Title,
  Form,
  ForgotPassword,
  MarginButton,
} from './Login.module.css'
import { Context } from '../../App'
import useForm from '../../commons/hooks/useForm'

function Login({ history: { push } }) {
  const [fields, handleFieldChange] = useForm({
    email: '',
    password: '',
  })
  const { user, setUser } = useContext(Context)

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await Auth.signIn(fields.email, fields.password)
      setUser(true)
      push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className={Container}>
      <WaveBackground />
      <h1 className={Title}>Nice to see you again!</h1>
      <form className={Form} onSubmit={handleSubmit}>
        <Input
          id="email"
          label={<>E-mail</>}
          type="email"
          value={fields.email}
          onChange={handleFieldChange}
        />
        <Input
          id="password"
          label={
            <>
              {'Password - '}
              <span className={ForgotPassword}>
                <Link to="/forgot">forgot?</Link>
              </span>
            </>
          }
          type="password"
          value={fields.password}
          onChange={handleFieldChange}
        />
        <Button className={MarginButton} type="submit" invertOnHover>
          Submit
        </Button>
      </form>
    </div>
  )
}

Login.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default Login
