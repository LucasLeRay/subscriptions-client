import React, { useState } from 'react'
import { API } from 'aws-amplify'
import { func } from 'prop-types'
import { Container } from './CreateSubscription.module.css'
import useForm from '../../hooks/useForm'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

function CreateSubscription({ onDone }) {
  const [step, setStep] = useState(1)
  const [fields, handleFieldChange] = useForm({
    service: '',
    cost: '',
    recurrence: '',
    payDay: '',
    payMonth: '',
  })

  function prevStep() {
    setStep(step - 1)
  }

  function nextStep() {
    setStep(step + 1)
  }

  function create() {
    const { service, cost, recurrence, payDay, payMonth } = fields
    return API.post('subscriptions', '/subscriptions', {
      body: {
        service,
        cost: Number(cost),
        recurrence,
        payDay: Number(payDay),
        payMonth: Number(payMonth),
      },
    })
  }

  async function handleSubmit() {
    try {
      await create()
      onDone()
    } catch (err) {
      console.error(err)
    }
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
      {step === 2 && (
        <Step2
          prevStep={prevStep}
          nextStep={nextStep}
          fields={fields}
          handleFieldChange={handleFieldChange}
        />
      )}
      {step === 3 && (
        <Step3
          prevStep={prevStep}
          nextStep={nextStep}
          fields={fields}
          handleFieldChange={handleFieldChange}
        />
      )}
      {step === 4 && (
        <Step4
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          fields={fields}
        />
      )}
    </div>
  )
}

CreateSubscription.propTypes = {
  onDone: func.isRequired,
}

export default CreateSubscription
