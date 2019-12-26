import React from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  ActiveButton,
  Buttons,
  TextInput,
  Step2Wrapper,
} from './CreateSubscription.module.css'
import Input from '../Input'
import Button from '../Button'

function Step2({
  prevStep,
  nextStep,
  fields: { price, recurrence },
  handleFieldChange,
}) {
  function validateFields() {
    return price.length > 0 && ['month', 'year'].includes(recurrence)
  }

  return (
    <div className={Form}>
      <h2>How many do you pay?</h2>
      <div className={Step2Wrapper}>
        <Input
          id="price"
          type="text"
          value={price}
          onChange={handleFieldChange}
        />
        <span className={TextInput}>every</span>
        <Input
          id="recurrence"
          type="text"
          value={recurrence}
          onChange={handleFieldChange}
        />
      </div>
      <div className={Buttons}>
        <Button onClick={prevStep} className={ActiveButton}>
          Previous
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

Step2.propTypes = {
  prevStep: func.isRequired,
  nextStep: func.isRequired,
  fields: shape({
    price: string.isRequired,
    recurrence: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default Step2
