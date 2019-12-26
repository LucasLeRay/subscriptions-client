import React from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  ActiveButton,
  Buttons,
  TextInput,
  Step3Wrapper,
} from './CreateSubscription.module.css'
import Input from '../Input'
import Button from '../Button'

function Step3({
  prevStep,
  nextStep,
  fields: { recurrence, payDay, payMonth },
  handleFieldChange,
}) {
  function validateFields() {
    return payDay.length > 0 && (recurrence === 'month' || payMonth.length > 0)
  }

  return (
    <div className={Form}>
      <h2>On what date?</h2>
      <div className={Step3Wrapper}>
        <span className={TextInput}>The</span>
        <Input
          id="payDay"
          type="text"
          value={payDay}
          onChange={handleFieldChange}
        />
        {recurrence === 'year' && (
          <Input
            id="payMonth"
            type="text"
            value={payMonth}
            onChange={handleFieldChange}
          />
        )}
        <span className={TextInput}>{`of each ${recurrence}`}</span>
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

Step3.propTypes = {
  prevStep: func.isRequired,
  nextStep: func.isRequired,
  fields: shape({
    recurrence: string.isRequired,
    payDay: string.isRequired,
    payMonth: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default Step3
