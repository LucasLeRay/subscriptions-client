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

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      })
      setUserCreated(newUser)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleConfirmationSubmit(e) {
    e.preventDefault()

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode)
      await Auth.signIn(fields.email, fields.password)
      setUser(true)
    } catch (err) {
      console.error(err)
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
        />
      ) : (
        <SignupForm
          handleSubmit={handleSubmit}
          fields={fields}
          handleFieldChange={handleFieldChange}
        />
      )}
    </div>
  )
}

export default Signup
