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

const priceRegExp = /^[0-9]*(\.)?[0-9]*$/

function Step2({
  prevStep,
  nextStep,
  fields: { price, recurrence },
  handleFieldChange,
}) {
  function validateFields() {
    return price.length > 0 && ['month', 'year'].includes(recurrence)
  }

  function handlePriceChange(e) {
    if (priceRegExp.test(e.target.value)) {
      handleFieldChange(e)
    }
  }

  return (
    <div className={Form}>
      <h2>How many do you pay?</h2>
      <div className={Step2Wrapper}>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
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
    price: string.isRequired,
    recurrence: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
}

export default Step2
