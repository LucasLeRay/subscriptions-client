import React from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  CancelButton,
  ActiveButton,
  Buttons,
  ServiceInput,
} from './CreateSubscription.module.css'
import Input from '../Input'
import Button from '../Button'

function Step1({ onDone, nextStep, fields: { service }, handleFieldChange }) {
  function validateFields() {
    return service.length > 0
  }

  return (
    <div className={Form}>
      <h2>Which service do you want to register?</h2>
      <Input
        id="service"
        type="text"
        value={service}
        onChange={handleFieldChange}
        className={ServiceInput}
      />
      <div className={Buttons}>
        <Button
          onClick={onDone}
          backgroundColor="#fff"
          textColor="#f14d38"
          className={CancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={nextStep}
          className={ActiveButton}
          disabled={!validateFields()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

Step1.propTypes = {
  onDone: func.isRequired,
  nextStep: func.isRequired,
  fields: shape({
    service: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default Step1
