import React, { useState } from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  ActiveButton,
  Buttons,
  Step4Wrapper,
} from './CreateSubscription.module.css'
import Button from '../Button'
import Service from '../Service'
import calcDayLeft from '../../../helpers/calcDayLeft'

const classNames = array => array.filter(Boolean).join(' ')

function Step4({
  prevStep,
  handleSubmit,
  fields: { service, cost, recurrence, payDay, payMonth },
}) {
  const [loading, setLoading] = useState(false)
  return (
    <div className={classNames([Form, Step4Wrapper])}>
      <h1>Overview</h1>
      <Service
        subscription={{
          service,
          cost: Number(cost),
          recurrence,
          dayLeft: calcDayLeft(Number(payDay), Number(payMonth)),
        }}
      />
      <div className={Buttons}>
        <Button onClick={prevStep} className={ActiveButton}>
          Previous
        </Button>
        <Button
          onClick={() => {
            setLoading(true)
            handleSubmit()
          }}
          loading={loading}
          className={ActiveButton}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

Step4.propTypes = {
  prevStep: func.isRequired,
  handleSubmit: func.isRequired,
  fields: shape({
    service: string.isRequired,
    cost: string.isRequired,
    recurrence: string.isRequired,
    payDay: string.isRequired,
    payMonth: string.isRequired,
  }).isRequired,
}

export default Step4
