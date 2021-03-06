import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { Context } from '../../App'
import SignupForm from './SignupForm'
import ConfirmationForm from './ConfirmationForm'
import WaveBackground from '../../commons/Components/WaveBackground'
import { Container, Title } from './Signup.module.css'
import useForm from '../../commons/hooks/useForm'

function Signup() {
  const [fields, handleFieldChange] = useForm({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  })
  const { user, setUser } = useContext(Context)
  const [userCreated, setUserCreated] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    try {
      setLoading(true)
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      })
      setError('')
      setUserCreated(newUser)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
    setLoading(false)
  }

  async function handleConfirmationSubmit() {
    try {
      setLoading(true)
      await Auth.confirmSignUp(fields.email, fields.confirmationCode)
      await Auth.signIn(fields.email, fields.password)
      setError('')
      setUser(true)
    } catch (err) {
      setError(err.message)
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className={Container}>
      <WaveBackground />
      <h1 className={Title}>Welcome!</h1>
      {user && <Redirect to="/" />}
      {userCreated ? (
        <ConfirmationForm
          handleSubmit={handleConfirmationSubmit}
          fields={fields}
          handleFieldChange={handleFieldChange}
          error={error}
          setError={setError}
          loading={loading}
        />
      ) : (
        <SignupForm
          handleSubmit={handleSubmit}
          fields={fields}
          handleFieldChange={handleFieldChange}
          error={error}
          setError={setError}
          loading={loading}
        />
      )}
    </div>
  )
}

export default Signup
