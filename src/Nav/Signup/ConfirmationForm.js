import React from 'react'
import { func, shape, string, bool } from 'prop-types'
import Input from '../../commons/Components/Input'
import Button from '../../commons/Components/Button'
import { Form, MarginButton, ErrorWrapper } from './Signup.module.css'

function SignupForm({
  handleSubmit,
  fields,
  handleFieldChange,
  error,
  setError,
  loading,
}) {
  function validateForm() {
    if (fields.confirmationCode.length === 0) {
      return 'Confirmation code is required'
    }
    return ''
  }

  return (
    <form
      className={Form}
      onSubmit={e => {
        e.preventDefault()
        const customError = validateForm()
        if (customError) {
          setError(customError)
        } else {
          handleSubmit()
        }
      }}
    >
      <Input
        id="confirmationCode"
        label={<>Confirmation code</>}
        type="text"
        value={fields.confirmationCode}
        onChange={handleFieldChange}
      />
      <Button loading={loading} className={MarginButton} type="submit">
        Submit
      </Button>
      <span className={ErrorWrapper}>{error}</span>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  fields: shape({
    confirmationCode: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
  error: string.isRequired,
  setError: func.isRequired,
  loading: bool.isRequired,
}

export default SignupForm
