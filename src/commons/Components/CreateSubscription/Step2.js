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
import Select from '../Select'

const costRegExp = /^[0-9]*(\.)?[0-9]*$/

function Step2({
  prevStep,
  nextStep,
  fields: { cost, recurrence },
  handleFieldChange,
}) {
  function validateFields() {
    return cost.length > 0 && ['month', 'year'].includes(recurrence)
  }

  function handleCostChange(e) {
    if (costRegExp.test(e.target.value)) {
      handleFieldChange(e)
    }
  }

  return (
    <div className={Form}>
      <h2>How many do you pay?</h2>
      <div className={Step2Wrapper}>
        <Input
          id="cost"
          type="number"
          value={cost}
          onChange={handleCostChange}
        />
        <span className={TextInput}>every</span>
        <Select
          type="text"
          value={{ label: recurrence, value: recurrence }}
          onChange={e => handleFieldChange(e, 'recurrence')}
          options={[
            {
              label: 'month',
              value: 'month',
            },
            {
              label: 'year',
              value: 'year',
            },
          ]}
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
    cost: string.isRequired,
    recurrence: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default Step2
