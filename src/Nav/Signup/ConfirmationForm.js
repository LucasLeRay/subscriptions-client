import React from 'react'
import { func, shape, string } from 'prop-types'
import Input from '../../commons/Components/Input'
import Button from '../../commons/Components/Button'
import { Form, MarginButton } from './Signup.module.css'

function SignupForm({ handleSubmit, fields, handleFieldChange }) {
  function validateForm() {
    return fields.confirmationCode.length > 0
  }

  return (
    <form className={Form} onSubmit={handleSubmit}>
      <Input
        id="confirmationCode"
        label={<>Confirmation code</>}
        type="text"
        value={fields.confirmationCode}
        onChange={handleFieldChange}
      />
      <Button className={MarginButton} type="submit" disabled={!validateForm()}>
        Submit
      </Button>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  fields: shape({
    confirmationCode: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default SignupForm
