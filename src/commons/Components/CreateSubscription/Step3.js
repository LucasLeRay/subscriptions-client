import React from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  ActiveButton,
  Buttons,
  TextInput,
  Step3Wrapper,
  PayDay,
  PayMonth,
  Recurrence,
} from './CreateSubscription.module.css'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function Step3({
  prevStep,
  nextStep,
  fields: { recurrence, payDay, payMonth },
  handleFieldChange,
}) {
  function validateFields() {
    return (
      payDay.length > 0 &&
      Number(payDay) > 0 &&
      Number(payDay) <= 30 &&
      (recurrence === 'month' ||
        (payMonth.length > 0 && Number(payMonth) <= 12 && Number(payMonth) > 0))
    )
  }

  return (
    <div className={Form}>
      <h2>On what date?</h2>
      <div className={Step3Wrapper}>
        <span className={TextInput}>The</span>
        <div className={Recurrence}>
          <Input
            className={PayDay}
            id="payDay"
            type="number"
            min="1"
            max="30"
            value={payDay}
            onChange={handleFieldChange}
          />
          {recurrence === 'year' && (
          <Select
            className={PayMonth}
            type="text"
            value={{ label: months[payMonth - 1], value: String(payMonth) }}
            options={months.map((value, index) => ({
              label: value,
              value: String(index + 1),
            }))}
            onChange={e => handleFieldChange(e, 'payMonth')}
          />
          )}
        </div>
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
