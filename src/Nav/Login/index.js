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
  ErrorWrapper,
} from './Login.module.css'
import { Context } from '../../App'
import useForm from '../../commons/hooks/useForm'

function Login({ history: { push } }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fields, handleFieldChange] = useForm({
    email: '',
    password: '',
  })
  const { user, setUser } = useContext(Context)

  function validateForm() {
    if (fields.email.length === 0) return 'Email is required'
    if (fields.password.length === 0) return 'Password is required'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const customError = validateForm()
    if (customError) {
      setError(customError)
    } else {
      try {
        setLoading(true)
        const { signInUserSession } = await Auth.signIn(
          fields.email,
          fields.password,
        )
        const admin = signInUserSession.accessToken.payload['cognito:groups']
        setUser({ admin })
        push('/')
      } catch (err) {
        setError(err.message)
        console.error(err)
        setLoading(false)
      }
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
        <Button loading={loading} className={MarginButton} type="submit">
          Submit
        </Button>
        <span className={ErrorWrapper}>{error}</span>
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
