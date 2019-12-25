import React, { useState } from 'react'
import { func } from 'prop-types'
import { Container, Form } from './CreateSubscription.module.css'
import Button from '../Button'
import Input from '../Input'
import useForm from '../../hooks/useForm'
import Step1 from './Step1'

function CreateSubscription({ onDone }) {
  const [step, setStep] = useState(1)
  const [fields, handleFieldChange] = useForm({
    service: '',
    price: '',
    recurrence: '',
    payDay: '',
  })
  const [payMonth, setPayMonth] = useState('')

  function prevStep() {
    setStep(step - 1)
  }

  function nextStep() {
    setStep(step + 1)
  }

  return (
    <div className={Container}>
      {step === 1 && (
        <Step1
          onDone={onDone}
          nextStep={nextStep}
          fields={fields}
          handleFieldChange={handleFieldChange}
        />
      )}
    </div>
  )
}

export default CreateSubscription
